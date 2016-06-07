import React from 'react'

export const pageSizes = (
  pageSize,
  changePageSize
) => {
  const pageSizes = []
  for (let i = 5; i <= 20; i+=5) {
    pageSizes.push(
      <li className={`page-item ${pageSize === i ? "active" : ''}`} key={i}>
        <a href="#" 
           className="page-link"
           onClick={event => {changePageSize.call(this, event, i)}}>{ i }</a>
      </li>
    )
  }
  return pageSizes
}