import { useState } from 'react'
import { Logbook } from './types'
import { useLogbooks } from './useLogbooks'

export function LogbookNavigator() {
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
        <ListItem
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

function ListItem({
  logbook,
  ondelete,
  onrename,
}: {
  logbook: Logbook
  ondelete: () => void
  onrename: (title: string) => void
}) {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(logbook.title)

  return (
    <li
      style={{
        display: 'inherit',
        gridGap: '1em',
      }}
    >
      <span className="like-button" style={{ flex: '1' }} hidden={isTitleEdit}>
        <a href={`logbook?id=${logbook.id}`}>{logbook.title}</a>
      </span>
      <button
        hidden={isTitleEdit}
        onClick={() => {
          setTitleEdit(true)
        }}
      >
        rename
      </button>
      <input
        aria-label="name"
        hidden={!isTitleEdit}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        hidden={!isTitleEdit}
        onClick={() => {
          onrename(title)
          setTitleEdit(false)
        }}
      >
        accept
      </button>
      <button
        hidden={!isTitleEdit}
        onClick={() => {
          setTitle(logbook.title)
          setTitleEdit(false)
        }}
      >
        discard
      </button>
      <button onClick={ondelete}>delete</button>
    </li>
  )
}
