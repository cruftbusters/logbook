import { useState } from 'react'
import { Actions, Logbook } from './types'
import { FlexColumn, FlexRow } from './FlexList'
import { SheetList } from './SheetList'

export function LogbookView({
  actions,
  logbook,
}: {
  actions: Actions
  logbook: Logbook
}) {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(logbook.title)

  return (
    <FlexColumn>
      <h2>{logbook.title}</h2>
      <FlexRow hidden={!isTitleEdit}>
        <input
          aria-label="name"
          className="like-button"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={() => {
            actions.rename(logbook.id, title)
            setTitleEdit(false)
          }}
        >
          Accept
        </button>
        <button
          onClick={() => {
            setTitle(logbook.title)
            setTitleEdit(false)
          }}
        >
          Discard
        </button>
      </FlexRow>
      <FlexRow>
        <button
          onClick={() => {
            setTitleEdit(true)
          }}
        >
          Rename
        </button>
        <button onClick={() => actions.delete(logbook.id)}>Delete</button>
      </FlexRow>
      <FlexRow>
        <SheetList actions={actions} logbook={logbook} />
      </FlexRow>
    </FlexColumn>
  )
}
