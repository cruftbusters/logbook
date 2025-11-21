import { useState, useEffect } from 'react'

export function useParams() {
  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams(location.search),
  )

  useEffect(() => {
    window.onpopstate = () => setParams(new URLSearchParams(location.search))

    return () => {
      window.onhashchange = null
    }
  })

  return params
}
