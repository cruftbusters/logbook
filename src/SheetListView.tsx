import { FlexRow, FlexColumn, List, ListItem } from './FlexList'
import { SheetView } from './SheetView'
import { Actions, Logbook } from './types'

export function SheetListView({
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
            <SheetView actions={actions} logbook={logbook} sheet={sheet} />
          </ListItem>
        ))}
      </List>
    </FlexColumn>
  )
}
