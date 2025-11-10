import { useEffect, useState } from 'react'
import { Logbook } from './types'

let setDatabase: (database: IDBDatabase) => void

const promise = new Promise<IDBDatabase>((resolve) => {
  setDatabase = resolve
})

{
  const request = window.indexedDB.open('MyTestDatabase', 3)

  request.onerror = () => {
    const message = 'failed to open database'
    console.error(message, request.error?.message)
  }

  request.onupgradeneeded = (event) => {
    const database = request.result
    const { oldVersion, newVersion } = event

    const migrations = [
      () => {
        const objectStore = database.createObjectStore('logbooks', {
          autoIncrement: true,
          keyPath: 'id',
        })
      },
    ]

    for (const migration of migrations.slice(oldVersion, newVersion || 0)) {
      migration()
    }
  }

  request.onsuccess = () => {
    setDatabase(request.result)
  }
}

//Start a transaction and make a request to do some database operation, like adding or retrieving data.
//Wait for the operation to complete by listening to the right kind of DOM event.
//Do something with the results (which can be found on the request object).

export function useLogbookList(defaultItems: () => Logbook[]) {
  const [items, setItems] = useState(defaultItems)

  useEffect(() => {
    promise.then((database) => {
      const objectStore = database
        .transaction('logbooks')
        .objectStore('logbooks')

      const items: Logbook[] = []

      const cursor = objectStore.openCursor()

      cursor.onsuccess = () => {
        const result = cursor.result
        if (result) {
          items.push(result.value)
          result.continue()
        } else {
          setItems(items)
        }
      }
    })
  }, [])

  const listOperations = {
    create: (name: string) => {
      promise.then((database) => {
        const objectStore = database
          .transaction('customers', 'readwrite')
          .objectStore('customers')

        const request = objectStore.add({ id: items.length.toString(), name })

        setItems((items) => items.concat({ id: items.length.toString(), name }))
      })
    },
    reset: () => {
      setItems(defaultItems())
    },
  }

  const itemOperations = (operand: Logbook) => {
    return {
      delete: () => {
        setItems((items) => items.filter((item) => item.id !== operand.id))
      },
      rename: (name: string) => {
        setItems((items) =>
          items.map((item) => {
            if (item.id === operand.id) {
              return { ...item, name }
            }
            return item
          }),
        )
      },
    }
  }

  return {
    items: items.map((item) => ({ ...item, ...itemOperations(item) })),
    ...listOperations,
  }
}
