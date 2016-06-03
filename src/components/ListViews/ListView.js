import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeed, changeCurrentImage } from '../../actions'
import ImageCard from '../ImageCard'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router'
import { determinePortrait } from './helpers'

class ListView extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  viewImage(image) {
    this.props.changeCurrentImage(image)
    this.context.router.push('/image')
  }

  renderImages() {
    const page = this.props.pageNumber - 1
    if (this.props.images.length === 0 && this.props.location.pathname === '/favorites') {
      return (
        <h4>You have no favorites yet! Go back to the <Link to="/feed">Feed</Link> and select some favorites!</h4>
      )
    }
    return !this.props.images[page] ? null :
      this.props.images[page].map((item, index) => 
        <ImageCard viewImage={this.viewImage.bind(this)} 
                   imageData={item} 
                   key={index} 
                   portrait={determinePortrait(item)} />
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

function mapStateToPropsFeed(state) {
  return {
    images: state.images.images,
    pageNumber: state.ui.feedPage
  }
}

function mapStateToPropsFavorites(state) {
  return {
    images: state.favorites.images,
    pageNumber: state.ui.favoritesPage
  }
}

const Feed = connect(mapStateToPropsFeed, { updateFeed, changeCurrentImage })(ListView)
const Favorites = connect(mapStateToPropsFavorites, { updateFeed, changeCurrentImage })(ListView)

export {
  Feed,
  Favorites
}