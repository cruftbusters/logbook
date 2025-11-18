import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { LogbookList } from './types'

export function useLogbooks(): [
  LogbookList,
  Dispatch<SetStateAction<LogbookList>>,
] {
  const [list, setList] = useState<LogbookList>({ items: [] })
  const [isUserUpdated, setUserUpdated] = useState(false)

  useEffect(() => {
    initialList.then(setList)
  }, [])

  function persist(action: SetStateAction<LogbookList>) {
    setList(action)
    setUserUpdated(true)
  }

  useEffect(() => {
    if (isUserUpdated) {
      idb.then((database) => {
        database
          .transaction('state', 'readwrite')
          .objectStore('state')
          .put({ ...list, id: 'logbookList' })
      })
    }
  }, [list, isUserUpdated])

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
        database.createObjectStore('state', { keyPath: 'id' })
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

  const objectStore = database.transaction('state').objectStore('state')

  const request = objectStore.get('logbookList')

  request.onerror = () => {
    const message = 'initial list failed to load'
    console.error(message, request.error)
    reject(message)
  }

  request.onsuccess = () => {
    if (request.result === undefined) {
      resolve({ items: [] })
    } else {
      resolve(request.result)
    }
  }
})
