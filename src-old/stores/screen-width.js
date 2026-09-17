import { writable } from 'svelte/store'

const store = writable(window.innerWidth)
window.addEventListener('resize', () => store.set(window.innerWidth))
export default store