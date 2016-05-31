import React, { Component } from 'react'
import { connect } from 'react-redux'
import dummyData from '../dummy_data'
import { updateFeed } from '../actions'
import jsonp from 'jsonp'

class ListView extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  renderImages() {
    return this.props.images.map((item, index) => 
      <img key={index} src={item.media.m} height="150px" />
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.props.updateFeed}>add more</button>
        <h4>{this.props.route.view}</h4>
        {this.renderImages.call(this)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    images: state.images
  }
}

export default connect(mapStateToProps, { updateFeed })(ListView)