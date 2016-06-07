import React from 'react'
import { connect } from 'react-redux'
import ListView from './ListView'
import { Pagination } from '../Pagination/Pagination'

class FavoritesList extends ListView {

  render() {
    return (
      <div>
        <button onClick={this.props.updateFeed}>Fetch More</button>
        <Pagination path={this.props.location.pathname} numberOfPages={this.props.images.length} />
        {this.renderImages.call(this)}
        <Pagination path={this.props.location.pathname} numberOfPages={this.props.images.length} />
      </div>
    )
  }
}

export default FavoritesList