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
        <span
          className="like-button"
          style={{
            filter: 'invert()',
            flex: '1',
          }}
          hidden={isTitleEdit}
        >
          {logbook.title}
        </span>
        <input
          aria-label="name"
          className="like-button"
          style={{
            flex: '1',
          }}
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
      </FlexRow>
      <FlexRow>
        <span style={{ flex: '1' }} />
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
