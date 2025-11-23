import { useLogbooks } from './useLogbooks'
import { LogbookListItem } from './LogbookListItem'

export function Experience() {
  const { list, status, ...actions } = useLogbooks()

  return (
    <p
      style={{
        display: 'flex',
        flexDirection: 'column',
        gridGap: '1em',
      }}
    >
      {list.items.map((logbook) => (
        <LogbookListItem
          key={logbook.id}
          logbook={logbook}
          ondelete={() => actions.delete(logbook.id)}
          onrename={(title) => actions.rename(logbook.id, title)}
        />
      ))}
      <button onClick={actions.create}>create logbook</button>
      <button hidden={list.items.length < 1} onClick={actions.clear}>
        clear logbooks
      </button>
      <span role="status">{status}</span>
    </p>
  )
}
