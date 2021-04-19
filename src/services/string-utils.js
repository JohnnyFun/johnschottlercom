export function slugify(value) {
  if (value == null || value === '') return ''
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s/g, '-')
}