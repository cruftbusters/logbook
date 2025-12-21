import { FlexRow, FlexColumn, List, ListItem } from './FlexList'
import { SheetExperience } from './SheetExperience'
import { Actions, Logbook } from './types'

export function SheetList({
  actions,
  logbook,
}: {
  actions: Actions
  logbook: Logbook
}) {
  return (
    <FlexColumn>
      <h3>Sheets</h3>
      <FlexRow>
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
