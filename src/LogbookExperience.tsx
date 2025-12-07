import { useState } from 'react'
import { Actions, Logbook } from './types'
import { FlexColumn, FlexRow, List, ListItem } from './FlexList'

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
        <button onClick={() => actions.delete(logbook.id)}>delete</button>
        <button onClick={() => actions.createSheet(logbook.id)}>
          create sheet
        </button>
      </FlexRow>
      <List>
        {logbook.sheets.map((sheet) => (
          <ListItem key={sheet.id}>
            <h3>{sheet.title}</h3>
            <button onClick={() => actions.deleteSheet(logbook.id, sheet.id)}>
              delete
            </button>
          </ListItem>
        ))}
      </List>
    </FlexColumn>
  )
}
