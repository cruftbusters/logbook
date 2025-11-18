import { useState } from 'react'
import './App.css'
import { Actions, Logbook } from './types'

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
  const [logbooks, setLogbooks] = useState<Logbook[]>([])

  function rename(title: string) {
    setLogbooks((logbooks) => {
      const [logbook] = logbooks
      return [{ ...logbook, title }]
    })
  }

  return (
    <>
      <p className="grid-item">
        <button
          onClick={() => {
            setLogbooks([
              {
                title: 'new logbook',
              },
            ])
          }}
        >
          create logbook
        </button>
      </p>
      {logbooks.map((logbook, index) => (
        <ListItem actions={{ rename }} logbook={logbook} key={index} />
      ))}
      <p className="grid-item">
        <button
          hidden={logbooks.length < 1}
          onClick={() => {
            setLogbooks([])
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
