import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { LogbookList } from './types'

export function useLogbooks(): [
  LogbookList,
  Dispatch<SetStateAction<LogbookList>>,
] {
  const [logbooks, setLogbooks] = useState<LogbookList>([])

  useEffect(() => {
    initialLogbooks.then(setLogbooks)
  }, [])

  function persistLogbooks(action: SetStateAction<LogbookList>) {
    setLogbooks((prevState) => {
      let logbooks = prevState

      if (typeof action === 'function') {
        logbooks = action(logbooks)
      } else {
        logbooks = action
      }

      idb.then((database) => {
        const objectStore = database
          .transaction('logbooks', 'readwrite')
          .objectStore('logbooks')

        objectStore.clear()

        for (const logbook of logbooks) {
          objectStore.add(logbook)
        }
      })

      return logbooks
    })
  }

  return [logbooks, persistLogbooks]
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
        database.createObjectStore('logbooks', {
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
    resolve(request.result)
  }
})

const initialLogbooks = idb.then((database) => {
  const logbooks: LogbookList = []

  const objectStore = database.transaction('logbooks').objectStore('logbooks')

  const cursor = objectStore.openCursor()

  cursor.onsuccess = () => {
    const result = cursor.result
    if (result) {
      logbooks.push(result.value)
      result.continue()
    }
  }

  return logbooks
})
