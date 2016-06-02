import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeed } from '../actions'
import Pagination from './Pagination'

class ListView extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  renderImages() {
    const page = this.props.pageNumber - 1
    return !this.props.images[page] ? null :
      this.props.images[page].map((item, index) => 
        <img key={index} src={item.media.m} height="150px" />
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