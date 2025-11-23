import { usePath } from './usePath'
import { LogbookNavigator } from './LogbookNavigator'
import './App.css'

export function App() {
  const path = usePath()

  return (
    <>
      <header>
        <h1>
          <a href="/">logbook</a>
        </h1>
      </header>
      <section hidden={path !== ''}>
        <LogbookNavigator />
      </section>
    </>
  )
}

export default App
