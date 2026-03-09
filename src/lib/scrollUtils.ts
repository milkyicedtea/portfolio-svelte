export function scrollTo(window: Window & typeof globalThis, e: MouseEvent, id: string) {
  e.preventDefault()
  const element = document.querySelector(id)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - 64
  window.scrollTo({ top, behavior: "smooth" })
}
