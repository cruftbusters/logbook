import { useState } from 'react'
import { Actions, Logbook } from './types'
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
  const [list, setList] = useLogbooks()

  function create() {
    setList((list) => ({
      items: [
        ...list.items,
        {
          id: crypto.randomUUID(),
          title: 'new logbook',
        },
      ],
    }))
  }

  function rename(id: string, title: string) {
    setList((list) => ({
      items: list.items.map((item) => {
        if (item.id === id) {
          return { id, title }
        }
        return item
      }),
    }))
  }

  function clear() {
    setList({ items: [] })
  }

  return (
    <>
      <p className="grid-item">
        <button onClick={create}>create logbook</button>
      </p>
      {list.items.map((logbook, index) => (
        <ListItem actions={{ rename }} logbook={logbook} key={logbook.id} />
      ))}
      <p className="grid-item">
        <button hidden={list.items.length < 1} onClick={clear}>
          clear logbooks
        </button>
      </p>
    </>
  )
}

function ListItem({
  actions,
  logbook,
}: {
  actions: Actions
  logbook: Logbook
}) {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(logbook.title)

  return (
    <li className="grid-item">
      <h2 className="zero-margin" hidden={isTitleEdit}>
        {logbook.title}
      </h2>
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
          actions.rename(logbook.id, title)
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
