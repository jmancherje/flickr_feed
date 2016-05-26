import React, { Component } from 'react'
import dummyData from '../dummy_data'

class ListView extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const images = dummyData.items.map((item, index) =>
      <img key={index} src={item.media.m} height="50px" />
    )
    return (
      <div>
        <h4>{this.props.route.view}</h4>
        {images}
      </div>
    )
  }
}

export default ListView