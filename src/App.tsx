import { usePath } from './usePath'
import { LogbookNavigator } from './LogbookNavigator'
import { LogbookPage } from './LogbookPage'
import './App.css'

export function App() {
  const path = usePath()

  return (
    <>
      <header>
        <h1>logbook</h1>
      </header>
      <section hidden={path !== ''}>
        <LogbookNavigator />
      </section>
      <section hidden={path !== 'logbook'}>
        <LogbookPage />
      </section>
    </>
  )
}

export default App
