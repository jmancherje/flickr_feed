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

export function toggleFavoriteImage(link, images) {
  for (let i = 0; i < images.length; i++) {
    for (let k = 0; k < images[i].length; k++) {
      console.log('image i k', images[i][k], link)
      if (images[i][k].link === link) {
        console.log('found link...')
        const image = images[i][k]
        // if image.favorite is undefined or false
        if (!image.favorite) {
          image.favorite = true
        } else {
          image.favorite = false
        }
        return images
      }
    }
  }
  return images
}