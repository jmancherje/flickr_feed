import React from 'react'

export const pageLinks = (
  handlePageChange,
  numberOfPages,
  feedPage,
  favoritesPage,
  view,
  linkClassName
) => {
  const pages = []
  const self = this
  const pageLimit = numberOfPages
  let start = 1, 
      end = pageLimit,
      currentPage

  if (view === 'feed') {
    currentPage = feedPage
  } else {
    currentPage = favoritesPage
  }
  if (pageLimit > 6) {
    if (currentPage > 3 && currentPage < pageLimit - 3) {
      start = currentPage - 3
      end = currentPage + 3
    } else if (currentPage <= 3) {
      end = 7
    } else if (currentPage >= pageLimit - 3) {
      start = pageLimit - 6
    }
  }
  for (let i = start; i <= end; i++) {
    pages.push(
      <li className={linkClassName(i)} key={i}>
        <a className="page-link"
           href="#" 
           onClick={(event) => {handlePageChange(event, i)}}>{ i }</a>
      </li>)
  }
  pages.push(
    <li className="page-item" key={'last'}>
      <a href="#"
         className="page-link"
         onClick={event => {handlePageChange(event, pageLimit)}}>{'>'}</a>
    </li>
  )
  pages.unshift(
    <li className="page-item" key={'first'}>
      <a href="#"
         className="page-link"
         onClick={event => {handlePageChange(event, 1)}}>{'<'}</a>
    </li>
  )
  return pages
}