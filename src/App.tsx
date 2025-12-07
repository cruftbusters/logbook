import { useLogbooks } from './useLogbooks'
import { FlexRow, FlexColumn, List, ListItem } from './FlexList'
import { LogbookExperience } from './LogbookExperience'
import './App.css'

export function App() {
  const { actions, list, status } = useLogbooks()

  return (
    <FlexColumn style={{ gap: '1em' }}>
      <h1>
        <a href="/">logbook</a>
      </h1>
      <div role="status">{status}</div>
      <button onClick={actions.create}>create logbook</button>
      <FlexRow>
        <List>
          <FlexColumn>
            {list.items.map((logbook) => (
              <FlexRow key={logbook.id}>
                <ListItem>
                  <LogbookExperience actions={actions} logbook={logbook} />
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
