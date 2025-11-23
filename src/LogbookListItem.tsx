import { useState } from 'react'
import { Logbook } from './types'

export function LogbookListItem({
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
        {logbook.title}
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
