import React, { Component } from 'react'
import dummyData from '../dummy_data'

class ListView extends Component {
  render() {
    const images = dummyData.items.map((item, index) =>
      <img key={index} src={item.media.m} height="50px" />
    )
    return (
      <div>
        {images}
      </div>
    )
  }
}

export default ListView