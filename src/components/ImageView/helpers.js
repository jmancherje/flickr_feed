import React from 'react'

export function renderTags(tags) {
  if (!tags) {
    return <span className="label label-danger">No Tags!</span>
  }

  const tagsList = tags.split(' ')
  return tagsList.map((tag, i) => 
    <span key={i} style={{ marginRight: '2px' }} className="label label-success">{tag}</span> 
  )
}