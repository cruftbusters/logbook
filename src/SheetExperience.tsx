import { useState } from 'react'
import { FlexColumn, FlexRow } from './FlexList'
import { Actions, Logbook, Sheet } from './types'

export function SheetExperience({
  actions,
  logbook,
  sheet,
}: {
  actions: Actions
  logbook: Logbook
  sheet: Sheet
}) {
  const [title, setTitle] = useState('')
  const [isTitleEdit, setTitleEdit] = useState(false)
  return (
    <FlexColumn>
      <h4>{sheet.title}</h4>
      <FlexRow hidden={!isTitleEdit}>
        <input
          aria-label="name"
          className="like-button"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={() => {
            actions.renameSheet(logbook.id, sheet.id, title)
            setTitleEdit(false)
          }}
        >
          Accept
        </button>
        <button
          onClick={() => {
            setTitle(sheet.title)
            setTitleEdit(false)
          }}
        >
          Discard
        </button>
      </FlexRow>
      <FlexRow>
        <button onClick={() => setTitleEdit(true)}>Rename</button>
        <button onClick={() => actions.deleteSheet(logbook.id, sheet.id)}>
          Delete
        </button>
      </FlexRow>
    </FlexColumn>
  )
}
