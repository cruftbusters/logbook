import { useLogbooks } from './useLogbooks'
import { FlexRow, FlexColumn, List, ListItem } from './FlexList'
import { LogbookExperience } from './LogbookExperience'
import './App.css'

export function App() {
  const { list, status, ...actions } = useLogbooks()

  return (
    <FlexColumn style={{ gap: '1em' }}>
      <FlexRow>
        <h1 style={{ flex: '1' }}>
          <a href="/">logbook</a>
        </h1>
      </FlexRow>
      <FlexRow>
        <div role="status" style={{ flex: '1' }}>
          {status}
        </div>
      </FlexRow>
      <FlexRow>
        <button onClick={actions.create} style={{ flex: '1' }}>
          create logbook
        </button>
      </FlexRow>
      <FlexRow>
        <button
          hidden={list.items.length < 1}
          onClick={actions.clear}
          style={{ flex: '1' }}
        >
          clear logbooks
        </button>
      </FlexRow>
      <FlexRow>
        <List>
          <FlexColumn>
            {list.items.map((logbook) => (
              <FlexRow key={logbook.id}>
                <ListItem>
                  <LogbookExperience
                    logbook={logbook}
                    ondelete={() => actions.delete(logbook.id)}
                    onrename={(title) => actions.rename(logbook.id, title)}
                  />
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
