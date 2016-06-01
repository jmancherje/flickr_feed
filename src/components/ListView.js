import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeed } from '../actions'
import Pagination from './Pagination'

class ListView extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  renderImages() {
    const page = this.props.pageNumber
    return !this.props.images[page - 1] ? null :
      this.props.images[page - 1].map((item, index) => 
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
  console.log(state.ui.feedPage)
  return {
    images: state.images,
    pageNumber: state.ui.feedPage
  }
}

export default connect(mapStateToProps, { updateFeed })(ListView)