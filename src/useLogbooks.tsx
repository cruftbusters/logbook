import { SetStateAction, useState, useEffect } from 'react'
import { LogbookList } from './types'

export function useLogbooks() {
  const [status, setStatus] = useState('loading from database')
  const [list, set] = useState<LogbookList>({ items: [] })
  const [isUserUpdated, setUserUpdated] = useState(false)

  useEffect(() => {
    initialList.then((result) => {
      if (result) {
        set(result)
        setStatus('loaded from database')
      } else {
        set({ items: [] })
        setStatus('connected to database')
      }
    })
  }, [])

  function persist(action: SetStateAction<LogbookList>) {
    set(action)
    setUserUpdated(true)
  }

  useEffect(() => {
    if (isUserUpdated) {
      idb.then((database) => {
        setStatus('saving to database')

        const request = database
          .transaction('state', 'readwrite')
          .objectStore('state')
          .put({ ...list, id: 'logbookList' })

        request.onerror = () => {
          const message = 'failed to update database'
          console.error(message, request.error)
          setStatus(message)
        }

        request.onsuccess = () => setStatus('saved to database')
      })
    }
  }, [list, isUserUpdated])

  return {
    list,
    status,
    create() {
      persist((list) => ({
        items: [
          ...list.items,
          {
            id: crypto.randomUUID(),
            title: 'new logbook',
          },
        ],
      }))
    },
    rename(id: string, title: string) {
      persist((list) => ({
        items: list.items.map((item) => {
          if (item.id === id) {
            return { id, title }
          }
          return item
        }),
      }))
    },
    delete(id: string) {
      persist((list) => ({
        items: list.items.filter((item) => item.id !== id),
      }))
    },
    clear() {
      persist({ items: [] })
    },
    persist,
  }
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

const initialList = new Promise<undefined | LogbookList>(
  async (resolve, reject) => {
    const database = await idb

    const objectStore = database.transaction('state').objectStore('state')

    const request = objectStore.get('logbookList')

    request.onerror = () => {
      const message = 'initial list failed to load'
      console.error(message, request.error)
      reject(message)
    }

    request.onsuccess = () => {
      resolve(request.result)
    }
  },
)
