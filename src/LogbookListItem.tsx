import { useState } from 'react'
import { Logbook } from './types'
import { FlexColumn, FlexRow } from './FlexList'

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
    <FlexColumn>
      <FlexRow>
        <h2 style={{ flex: '1' }}>{logbook.title}</h2>
      </FlexRow>
      <FlexRow hidden={!isTitleEdit}>
        <input
          aria-label="name"
          className="like-button"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={() => {
            onrename(title)
            setTitleEdit(false)
          }}
        >
          accept
        </button>
        <button
          onClick={() => {
            setTitle(logbook.title)
            setTitleEdit(false)
          }}
        >
          discard
        </button>
      </FlexRow>
      <FlexRow>
        <button
          onClick={() => {
            setTitleEdit(true)
          }}
        >
          rename
        </button>
        <button onClick={ondelete}>delete</button>
      </FlexRow>
    </FlexColumn>
  )
}
