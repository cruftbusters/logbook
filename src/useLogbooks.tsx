import { SetStateAction, useState, useEffect } from 'react'
import { LogbookList } from './types'
import { idb } from './idb'

export function useLogbooks() {
  const [status, setStatus] = useState('loading from database')
  const [list, set] = useState<LogbookList>({ items: [] })

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

  const [isUpdatedByUser, setUpdatedByUser] = useState(false)

  useEffect(() => {
    if (isUpdatedByUser) {
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
  }, [list, isUpdatedByUser])

  function setByUser(action: SetStateAction<LogbookList>) {
    set(action)
    setUpdatedByUser(true)
  }

  return {
    list,
    status,
    create() {
      setByUser((list) => ({
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
      setByUser((list) => ({
        items: list.items.map((item) => {
          if (item.id === id) {
            return { id, title }
          }
          return item
        }),
      }))
    },
    delete(id: string) {
      setByUser((list) => ({
        items: list.items.filter((item) => item.id !== id),
      }))
    },
  }
}

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
