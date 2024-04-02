import { writable } from 'svelte/store'

const store = writable(getResponsiveInfo())
window.addEventListener('resize', () => store.set(getResponsiveInfo()))

function getResponsiveInfo() {
  const screenWidth = window.innerWidth
  const minDesktopWidth = 1100
  const isDesktop = screenWidth > minDesktopWidth
  const info = {
    width: screenWidth,
    isDesktop,
  }
  return info
}

export default store