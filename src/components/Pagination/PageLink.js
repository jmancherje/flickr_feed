import React from 'react'

export const pageLinks = (
  handlePageChange,
  numberOfPages,
  feedPage,
  linkClassName
) => {
  const pages = []
  const self = this
  const pageLimit = numberOfPages
  if (pageLimit === 0) {
    return null
  }
  let start = 1, 
      end = pageLimit

  if (pageLimit > 6) {
    if (feedPage > 3 && feedPage < pageLimit - 3) {
      start = feedPage - 3
      end = feedPage + 3
    } else if (feedPage <= 3) {
      end = 7
    } else if (feedPage >= pageLimit - 3) {
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
         onClick={event => {handlePageChange(event, pageLimit)}}>{'>>'}</a>
    </li>
  )
  pages.unshift(
    <li className="page-item" key={'first'}>
      <a href="#"
         className="page-link"
         onClick={event => {handlePageChange(event, 1)}}>{'<<'}</a>
    </li>
  )
  return pages
}