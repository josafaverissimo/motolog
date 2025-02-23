import { DataTable} from '@/components/ui/datatable'

export function DriversTable() {
  const data = [{status: 'ola', email: 'ola'}]

  return (
    <DataTable data={data}/>
  )
}
