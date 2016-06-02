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

export function unsplitPages(pages) {
  if (pages.length < 1) {
    return pages
  }

  const allItems = []
  for (let i = 0; i < pages.length; i++) {
    pages[i].forEach(item => {
      allItems.push(item)
    })
  }
  return allItems
}