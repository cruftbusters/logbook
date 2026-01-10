import { useState } from 'react'
import { FlexColumn, FlexRow } from './FlexList'
import { Actions, Logbook } from './types'
import { SheetListView } from './SheetListView'

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
        <article>
          <h3>Summary</h3>
        </article>
      </FlexRow>
      <FlexRow>
        <SheetListView actions={actions} logbook={logbook} />
      </FlexRow>
    </FlexColumn>
  )
}
