import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeed } from '../actions'
import ImageCard from './ImageCard'
import Pagination from './Pagination'

class ListView extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  determinePortrait(image) {
    const description = image.description
    const startWidth = description.indexOf('width="') + 7
    const endWidth = description.indexOf('"', startWidth)
    const width = +description.substring(startWidth, endWidth)
    console.log(width)

    const startHeight = description.indexOf('height="') + 8
    const endHeight = description.indexOf('"', startHeight)
    const height = +description.substring(startHeight, endHeight)
    console.log(height)

    const aspectRatio = width / height
    return aspectRatio < 1.333333333
  }

  renderImages() {
    const page = this.props.pageNumber - 1
    const self = this
    return !this.props.images[page] ? null :
      this.props.images[page].map((item, index) => 
        <ImageCard viewImage={'hi'} imageData={item} key={index} portrait={self.determinePortrait(item)} />
      )
  }

  render() {
    return (
      <div>
        <button onClick={this.props.updateFeed}>Fetch More</button>
        <Pagination numberOfPages={this.props.images.length} />
        {this.renderImages.call(this)}
        <Pagination numberOfPages={this.props.images.length} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.images.images,
    pageNumber: state.ui.feedPage
  }
}

export default connect(mapStateToProps, { updateFeed })(ListView)