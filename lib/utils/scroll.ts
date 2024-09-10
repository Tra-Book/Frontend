export const scrollToTop = () => {
  const isBrowser = () => typeof window !== 'undefined' //The approach recommended by Next.js
  if (!isBrowser()) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
