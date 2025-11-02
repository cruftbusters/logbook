import { useState } from 'react'
import { Logbook } from './types'

export function useLogbookList(defaultItems: () => Logbook[]) {
  const [items, setItems] = useState(defaultItems)

  const listOperations = {
    create: (name: string) => {
      setItems((items) => items.concat({ id: items.length.toString(), name }))
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
