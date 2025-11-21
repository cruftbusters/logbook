import { useState, useEffect } from 'react'

export const usePath = () => {
  const initialPath = window.location.pathname.substring(1)

  const [path, setPath] = useState(initialPath)

  useEffect(() => {
    window.onpopstate = () => {
      setPath(window.location.pathname.substring(1))
    }

    return () => {
      window.onhashchange = null
    }
  }, [])

  return path
}
