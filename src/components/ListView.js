import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeed, changeCurrentImage } from '../actions'
import ImageCard from './ImageCard'
import Pagination from './Pagination'

class ListView extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  viewImage(image) {
    this.props.changeCurrentImage(image)
    this.context.router.push('/image')
  }

  determinePortrait(image) {
    const description = image.description
    const startWidth = description.indexOf('width="') + 7
    const endWidth = description.indexOf('"', startWidth)
    const width = +description.substring(startWidth, endWidth)

    const startHeight = description.indexOf('height="') + 8
    const endHeight = description.indexOf('"', startHeight)
    const height = +description.substring(startHeight, endHeight)

    const aspectRatio = width / height
    return aspectRatio < 1.333333333
  }

  renderImages() {
    const page = this.props.pageNumber - 1
    const self = this
    return !this.props.images[page] ? null :
      this.props.images[page].map((item, index) => 
        <ImageCard viewImage={this.viewImage.bind(this)} 
                   imageData={item} 
                   key={index} 
                   portrait={self.determinePortrait(item)} />
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

ListView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    images: state.images.images,
    pageNumber: state.ui.feedPage
  }
}

export default connect(mapStateToProps, { updateFeed, changeCurrentImage })(ListView)