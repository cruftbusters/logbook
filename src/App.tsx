import { useLogbooks } from './useLogbooks'
import { FlexRow, FlexColumn, List, ListItem } from './FlexList'
import { LogbookView } from './LogbookView'
import './App.css'

export function App() {
  const { actions, list, status } = useLogbooks()

  return (
    <FlexColumn style={{ gap: '1em' }}>
      <div role="status">{status}</div>
      <h1>
        <a href="/">Logbooks</a>
      </h1>
      <div>
        <button onClick={actions.create}>Create logbook</button>
      </div>
      <FlexRow>
        <List>
          <FlexColumn>
            {list.items.map((logbook) => (
              <FlexRow key={logbook.id}>
                <ListItem>
                  <LogbookView actions={actions} logbook={logbook} />
                </ListItem>
              </FlexRow>
            ))}
          </FlexColumn>
        </List>
      </FlexRow>
    </FlexColumn>
  )
}

export default App
