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
          <Link href={url} className="text-brand-secondary-500">{urlName}</Link>
        </Button>
      );
    }

    const doReadableByField = {
      createdAt: readableIsoDateTime,
      updatedAt: readableIsoDateTime,
      deletedAt: readableIsoDateTime,
      birthdate: readableIsoDate,
      cnhImageUrl: readableUrl("Foto da CNH"),
      crlvImageUrl: readableUrl("Foto da CRLV"),
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

  return (
    <div className="max-w-full overflow-x-scroll">
      <DataTable data={datatableData} />
    </div>
  );
}
