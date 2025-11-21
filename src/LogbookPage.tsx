import { useParams } from './useParams'

export function LogbookPage() {
  const params = useParams()
  const id = params.get('id')

  return (
    <>
      <h2>{id}</h2>
    </>
  )
}
