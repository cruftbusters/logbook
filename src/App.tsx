import { LogbookNavigator } from './LogbookNavigator'
import './App.css'

export function App() {
  return (
    <>
      <header>
        <h1>
          <a href="/">logbook</a>
        </h1>
      </header>
      <section>
        <LogbookNavigator />
      </section>
    </>
  )
}

export default App
