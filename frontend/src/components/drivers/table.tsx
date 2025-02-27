import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import type { Data } from "@/components/ui/datatable";
import { useQuery } from "@tanstack/react-query";
import { useDriversService } from "@/services/drivers";
import type { Driver } from "@/services/drivers";
import { toast } from "react-toastify";
import { PaginationState } from "@tanstack/react-table";

const driversService = useDriversService();

interface DriversTableProps {
  onEditRow?: (driver: Driver) => void
  onDeleteRow?: (driver: Driver) => void
}

export function DriversTable({ onEditRow, onDeleteRow }: DriversTableProps) {
  const [driversByHash, setDriversByHash] = useState<Map<string, Driver>>(new Map())
  const [datatableData, setDatatableData] = useState<Data[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25
  })
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["drivers", pagination.pageIndex, pagination.pageSize],
    queryFn: () => driversService.getDrivers(pagination.pageIndex + 1)
  });

  const columnsAliases = {
    createdAt: "criado em",
    updatedAt: "atualizado em",
    name: "nome",
    cpf: "cpf",
    birthdate: "data de nascimento",
    phone: "celular",
    address: "endereço",
    status: "ativo",
    cnhImageUrl: "cnh",
    crlvImageUrl: "crlv",
  };

  useEffect(() => {
    refetch()
  }, [pagination])

  function doDriverDataReadable(driver: Driver) {
    function readableIsoDateTime(date: string) {
      if (!date) return "-";

      return new Date(date).toLocaleString("pt-BR");
    }

    function readableIsoDate(date: string) {
      if (!date) return "-";

      return new Date(date).toLocaleDateString("pt-BR");
    }

    function readableUrl(urlName: string) {
      return (url: string) => (
        <Button variant="link">
          <Link
            href={url}
            className="text-brand-secondary-500 dark:text-brand-secondary-dark-500"
            target="_blank"
          >
            {urlName}
          </Link>
        </Button>
      );
    }

    function readableStatus(status: boolean) {
      const activeClass = status ? "bg-green-600" : "bg-red-600";

      return <div className={`size-4 rounded-full ${activeClass}`} />;
    }

    const doReadableByField = {
      createdAt: readableIsoDateTime,
      updatedAt: readableIsoDateTime,
      birthdate: readableIsoDate,
      cnhImageUrl: readableUrl("Ver CNH"),
      crlvImageUrl: readableUrl("Ver CRLV"),
      status: readableStatus,
    };

    const readableDriverData: { [key: string]: string | ReactNode } = {
      ...driver,
    };

    for (const entry of Object.entries(doReadableByField)) {
      const [field, doReadable] = entry;

      readableDriverData[field] = doReadable(
        driver[field as keyof Driver] as any,
      );
    }

    return readableDriverData;
  }

  useEffect(() => {
    if (!data) {
      return;
    }

    setDriversByHash(
      data.drivers.reduce((drivers, driver) => {
        drivers.set(driver.hash, driver)

        return drivers
      }, new Map<string, Driver>())
    )

    setDatatableData(data.drivers.map(doDriverDataReadable));
  }, [data]);

  if (isLoading) return <span>Carregando...</span>;

  if (error) return <span>Erro: {error.message}</span>;

  if (!datatableData.length) {
    return <p>Não há nenhum motorista cadastrado.</p>;
  }

  function handlerEditRow(driverHash: string) {
    if(!onEditRow) return

    const driverToEdit = driversByHash.get(driverHash)

    if(!driverToEdit) {
      toast.error('Motorista não encontrado. Por favor, entre em contato com o suporte')

      return
    }

    onEditRow(driverToEdit)
  }

  function handlerDeleteRow(driverHash: string) {
    if(!onDeleteRow) return

    const driverToDelete = driversByHash.get(driverHash)

    if(!driverToDelete) {
      toast.error('Motorista não encontrado. Por favor, entre em contato com o suporte')

      return
    }

    onDeleteRow(driverToDelete)
  }

  return (
    <div className="max-w-full overflow-x-scroll">
      <DataTable
        data={datatableData}
        pagination={pagination}
        setPagination={setPagination}
        totalItems={data?.totalItems}
        columnsAliases={columnsAliases}
        onEditRow={handlerEditRow}
        onDeleteRow={handlerDeleteRow}
      />
    </div>
  );
}
