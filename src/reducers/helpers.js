export function splitIntoPages(items, pageSize) {
  
  const numberOfPages = Math.ceil(items.length / pageSize) || 1
  let allPages = []
  for (let i = 0; i < numberOfPages; i++) {
    allPages.push([])
  }

  const total = items.length - 1
  let pageItems = []

  for (let i = 0, currentPage = 0; i <= total; i++) {
    pageItems.push(items[i])
    if (pageItems.length === pageSize || i === total) {
      allPages[currentPage] = [...pageItems]
      currentPage++
      pageItems = []
    }
  }

  return allPages
}