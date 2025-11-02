import { Fragment } from 'react'
import './App.css'
import { useLogbookList } from './useLogbookList'

function App() {
  const list = useLogbookList(() => [
    { id: '0', name: 'biz' },
    { id: '1', name: 'personal' },
  ])

  return (
    <>
      <header>
        <h1>logbook</h1>
      </header>
      <section>
        <p style={{ display: 'grid', gridGap: '0.25em' }}>
          <button onClick={() => list.create('new logbook')}>
            create logbook
          </button>
          <button onClick={() => list.reset()}>factory reset</button>
        </p>
        <p
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gridGap: '0.25em',
          }}
        >
          {list.items.map((item) => (
            <Fragment key={item.id}>
              <input
                value={item.name}
                onChange={(event) => list.rename(item.id, event.target.value)}
              />
              <button onClick={() => list.delete(item.id)}>&times;</button>
            </Fragment>
          ))}
        </p>
      </section>
    </>
  )
}

export default App
