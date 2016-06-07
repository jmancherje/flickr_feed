import React from 'react'

function options() {
  const options = []
  for (let i = 5; i <= 20; i += 5) {
    options.push(<option key={i} value={i}>{i}</option>)
  }
  return options
}

export default function ({
  currentPageSize,
  changePageSize
}) {
  return (
    <select onChange={(e) => {changePageSize(e.target.value)}} defaultValue={currentPageSize}>
      {(() => {
        const options = []
        for (let i = 5; i <= 20; i += 5) {
          options.push(<option key={i} value={i}>{i}</option>)
        }
        return options
      })()}
    </select>
  )
}