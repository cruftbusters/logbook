import { useLogbooks } from './useLogbooks'
import { useParams } from './useParams'

export function LogbookPage() {
  const params = useParams()
  const id = params.get('id')

  const logbooks = useLogbooks()
  const logbook = logbooks.list.items.find((logbook) => logbook.id === id)

  return (
    <>
      <h2>{logbook?.title}</h2>
    </>
  )
}
