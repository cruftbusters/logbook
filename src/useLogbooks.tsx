import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { LogbookList } from './types'

export function useLogbooks(): [
  LogbookList,
  Dispatch<SetStateAction<LogbookList>>,
] {
  const [list, setList] = useState<LogbookList>([])

  useEffect(() => {
    initialList.then(setList)
  }, [])

  function persist(action: SetStateAction<LogbookList>) {
    setList((prevState) => {
      let items = prevState

      if (typeof action === 'function') {
        items = action(items)
      } else {
        items = action
      }

      idb.then((database) => {
        const objectStore = database
          .transaction('logbook', 'readwrite')
          .objectStore('logbook')

        objectStore.put({ id: 'list', items })
      })

      return items
    })
  }

  return [list, persist]
}

const idb = new Promise<IDBDatabase>((resolve, reject) => {
  const request = window.indexedDB.open('logbook', 1)

  request.onerror = () => {
    const message = 'idb database error'
    console.error(message, request.error?.message)
    reject(message)
  }

  request.onupgradeneeded = (event) => {
    const database = request.result
    const { oldVersion, newVersion } = event

    const migrations = [
      () => {
        database.createObjectStore('logbook', { keyPath: 'id' })
      },
    ]

    for (const migration of migrations.slice(oldVersion, newVersion || 0)) {
      migration()
    }
  }

  request.onsuccess = () => {
    resolve(request.result)
  }
})

const initialList = new Promise<LogbookList>(async (resolve, reject) => {
  const database = await idb

  const objectStore = database.transaction('logbook').objectStore('logbook')

  const request = objectStore.get('list')

  request.onerror = () => {
    const message = 'initial list failed to load'
    console.error(message, request.error)
    reject(message)
  }

  request.onsuccess = () => {
    if (request.result === undefined) {
      resolve([])
    } else {
      resolve(request.result.items)
    }
  }
})
