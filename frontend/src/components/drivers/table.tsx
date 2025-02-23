import { DataTable } from "@/components/ui/datatable";
import type { Data } from '@/components/ui/datatable'
import { useQuery } from '@tanstack/react-query'
import { useDriversService } from '@/services/drivers'

const driversService = useDriversService()

export function DriversTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => driversService.getDrivers(1)
  })

  if(isLoading) return <span>Carregando...</span>

  if(error) return <span>Erro: {error.message}</span>

  return (
    <div className="max-w-full overflow-x-scroll">
      <DataTable data={data?.drivers as unknown as Data[] || []} />
    </div>
  )
}
