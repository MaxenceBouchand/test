import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const onChange = () => setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', onChange)
    setMatches(mediaQueryList.matches)
    return () => mediaQueryList.removeEventListener('change', onChange)
  }, [query])

  return matches
}
