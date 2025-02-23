import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import type { Data } from "@/components/ui/datatable";
import { useQuery } from "@tanstack/react-query";
import { useDriversService } from "@/services/drivers";
import type { Driver } from "@/services/drivers";

const driversService = useDriversService();

export function DriversTable() {
  const [datatableData, setDatatableData] = useState<Data[]>([]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["drivers"],
    queryFn: () => driversService.getDrivers(1),
  });

  const columnsAliases = {
    createdAt: 'criado em',
    updatedAt: 'atualizado em',
    name: 'nome',
    cpf: 'cpf',
    birthdate: 'data de nascimento',
    phone: 'celular',
    address: 'endereço',
    status: 'ativo',
    cnhImageUrl: 'cnh',
    crlvImageUrl: 'crlv',
  }



  function doDriverDataReadable(driver: Driver) {
    function readableIsoDateTime(date: string) {
      if(!date) return '-'

      return new Date(date).toLocaleString("pt-BR");
    }

    function readableIsoDate(date: string) {
      if(!date) return '-'

      return new Date(date).toLocaleDateString("pt-BR");
    }

    function readableUrl(urlName: string) {
      return (url: string) => (
        <Button variant="link">
          <Link href={url} className="text-brand-secondary-500" target="_blank">{urlName}</Link>
        </Button>
      );
    }

    function readableStatus(status: boolean) {
      const activeClass = status ? 'bg-green-600' : 'bg-red-600'

      return <div
        className={`size-4 rounded-full ${activeClass}`}
      ></div>
    }

    const doReadableByField = {
      createdAt: readableIsoDateTime,
      updatedAt: readableIsoDateTime,
      birthdate: readableIsoDate,
      cnhImageUrl: readableUrl("Ver da CNH"),
      crlvImageUrl: readableUrl("Ver da CRLV"),
      status: readableStatus
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

    setDatatableData(data.drivers.map(doDriverDataReadable));
  }, [data]);

  if (isLoading) return <span>Carregando...</span>;

  if (error) return <span>Erro: {error.message}</span>;

  if(!datatableData.length) {
    return <p>Não há nenhum motorista cadastrado.</p>
  }

  return (
    <div className="max-w-full overflow-x-scroll">
      <DataTable data={datatableData} columnsAliases={columnsAliases} />
    </div>
  );
}
