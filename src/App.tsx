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

  function rename(title: string) {
    setList((list) => {
      const [item] = list.items
      return { items: [{ ...item, title }] }
    })
  }

  return (
    <>
      <p className="grid-item">
        <button
          onClick={() => {
            setList({
              items: [
                {
                  title: 'new logbook',
                },
              ],
            })
          }}
        >
          create logbook
        </button>
      </p>
      {list.items.map((logbook, index) => (
        <ListItem actions={{ rename }} logbook={logbook} key={index} />
      ))}
      <p className="grid-item">
        <button
          hidden={list.items.length < 1}
          onClick={() => {
            setList({ items: [] })
          }}
        >
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
          actions.rename(title)
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
