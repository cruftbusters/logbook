import { useState } from 'react'
import { Logbook } from './types'

export function useLogbookList(defaultItems: () => Logbook[]) {
  const [items, setItems] = useState(defaultItems)

  const operations = {
    create: (name: string) => {
      setItems((items) => items.concat({ id: items.length.toString(), name }))
    },
    delete: (id: string) => {
      setItems((items) => items.filter((item) => item.id !== id))
    },
    rename: (id: string, name: string) => {
      setItems((items) =>
        items.map((item) => {
          if (item.id === id) {
            return { ...item, name }
          }
          return item
        }),
      )
    },
    reset: () => {
      setItems(defaultItems())
    },
  }

  return { items, ...operations }
}
