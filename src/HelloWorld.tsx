import { useState } from 'react'

export function HelloWorld({ name }: { name: string }) {
  const [counter, setCounter] = useState(1)
  return (
    <div>
      <p>{`Hello ${name} x${counter}!`}</p>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        Increment
      </button>
    </div>
  )
}
