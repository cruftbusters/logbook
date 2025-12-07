import { SetStateAction, useState, useEffect } from 'react'
import { Actions, LogbookList } from './types'
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

  const actions: Actions = {
    create() {
      setByUser((list) => ({
        items: [
          ...list.items,
          {
            id: crypto.randomUUID(),
            title: 'new logbook',
            sheets: [],
          },
        ],
      }))
    },
    createSheet(id: string) {
      setByUser((list) => ({
        items: list.items.map((logbook) => {
          if (logbook.id === id) {
            return {
              ...logbook,
              sheets: logbook.sheets.concat({
                id: crypto.randomUUID(),
                title: 'new sheet',
              }),
            }
          }

          return logbook
        }),
      }))
    },
    delete(id: string) {
      setByUser((list) => ({
        items: list.items.filter((item) => item.id !== id),
      }))
    },
    deleteSheet(id: string, sheetId: string) {
      setByUser((list) => ({
        items: list.items.map((logbook) => {
          if (logbook.id === id) {
            return {
              ...logbook,
              sheets: logbook.sheets.filter((sheet) => sheet.id !== sheetId),
            }
          }

          return logbook
        }),
      }))
    },
    rename(id: string, title: string) {
      setByUser((list) => ({
        items: list.items.map((item) => {
          if (item.id === id) {
            return { ...item, title }
          }
          return item
        }),
      }))
    },
    renameSheet(id: string, sheetId: string, title: string) {
      setByUser((list) => ({
        items: list.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              sheets: item.sheets.map((sheet) => {
                if (sheet.id === sheetId) {
                  return { ...sheet, title }
                }

                return sheet
              }),
            }
          }
          return item
        }),
      }))
    },
  }

  return {
    actions,
    list,
    status,
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
      if (request.result !== undefined) {
        for (const item of request.result.items) {
          item.sheets = []
        }
      }
      resolve(request.result)
    }
  },
)
