import { useLogbooks } from './useLogbooks'
import { FlexRow, FlexColumn, List, ListItem } from './FlexList'
import { LogbookListItem } from './LogbookListItem'

export function Experience() {
  const { list, status, ...actions } = useLogbooks()

  return (
    <FlexColumn style={{ gap: '1em' }}>
      <FlexRow>
        <button onClick={actions.create}>create logbook</button>
        <span role="status" className="like-button">
          {status}
        </span>
        <button hidden={list.items.length < 1} onClick={actions.clear}>
          clear logbooks
        </button>
      </FlexRow>
      <FlexRow>
        <List>
          <FlexColumn>
            {list.items.map((logbook) => (
              <FlexRow key={logbook.id}>
                <ListItem>
                  <LogbookListItem
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
