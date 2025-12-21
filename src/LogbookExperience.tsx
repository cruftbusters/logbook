import { useState } from 'react'
import { Actions, Logbook } from './types'
import { FlexColumn, FlexRow, List, ListItem } from './FlexList'
import { SheetExperience } from './SheetExperience'

export function LogbookExperience({
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
        <button onClick={() => actions.createSheet(logbook.id)}>
          Create sheet
        </button>
      </FlexRow>
      <List>
        {logbook.sheets.map((sheet) => (
          <ListItem key={sheet.id}>
            <SheetExperience
              actions={actions}
              logbook={logbook}
              sheet={sheet}
            />
          </ListItem>
        ))}
      </List>
    </FlexColumn>
  )
}
