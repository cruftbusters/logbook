import { useState } from 'react'
import './App.css'
import { Logbook } from './types'

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

  return (
    <>
      <p>
        <button
          onClick={() => {
            setLogbooks([
              {
                title: 'new logbook',
                delete: () => {
                  setLogbooks([])
                },
                rename: (value) => {
                  setLogbooks((logbooks) => {
                    const [logbook] = logbooks
                    return [{ ...logbook, title: value }]
                  })
                },
              },
            ])
          }}
        >
          create logbook
        </button>
      </p>
      {logbooks.map((logbook, index) => (
        <ListItem logbook={logbook} key={index} />
      ))}
    </>
  )
}

function ListItem({ logbook }: { logbook: Logbook }) {
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
          logbook.rename(title)
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
      <button onClick={logbook.delete}>delete</button>
    </li>
  )
}

export default App
