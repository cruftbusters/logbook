import { useState } from 'react'
import { Logbook } from './types'
import { useLogbooks } from './useLogbooks'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>logbook</h1>
      </header>
      <section>
        <Navigator />
      </section>
    </>
  )
}

function Navigator() {
  const { list, ...actions } = useLogbooks()

  return (
    <p
      style={{
        display: 'flex',
        flexDirection: 'column',
        gridGap: '1em',
      }}
    >
      {list.items.map((logbook) => (
        <ListItem
          key={logbook.id}
          logbook={logbook}
          onrename={(title) => actions.rename(logbook.id, title)}
        />
      ))}
      <button onClick={actions.create}>create logbook</button>
      <button hidden={list.items.length < 1} onClick={actions.clear}>
        clear logbooks
      </button>
    </p>
  )
}

function ListItem({
  logbook,
  onrename,
}: {
  logbook: Logbook
  onrename: (title: string) => void
}) {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(logbook.title)

  return (
    <li
      style={{
        display: 'inherit',
        gridGap: '1em',
      }}
    >
      <span className="like-button" style={{ flex: '1' }} hidden={isTitleEdit}>
        {logbook.title}
      </span>
      <button
        hidden={isTitleEdit}
        onClick={() => {
          setTitleEdit(true)
        }}
      >
        rename
      </button>
      <input
        aria-label="name"
        hidden={!isTitleEdit}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        hidden={!isTitleEdit}
        onClick={() => {
          onrename(title)
          setTitleEdit(false)
        }}
      >
        accept
      </button>
      <button
        hidden={!isTitleEdit}
        onClick={() => {
          setTitle(logbook.title)
          setTitleEdit(false)
        }}
      >
        discard
      </button>
    </li>
  )
}

export default App
