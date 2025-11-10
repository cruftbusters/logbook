import { useState } from 'react'
import { Logbook } from './types'

const initialState = [
  { id: '0', name: 'biz' },
  { id: '1', name: 'personal' },
]

export function useLogbookList() {
  const [items, setItems] = useState(initialState)

  const listOperations = {
    create: (name: string) => {
      setItems((items) => items.concat({ id: items.length.toString(), name }))
    },
    reset: () => {
      setItems(initialState)
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
