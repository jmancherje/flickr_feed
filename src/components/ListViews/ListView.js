import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeed, changeCurrentImage, fetchFavorites } from '../../actions'
import ImageCard from '../ImageCard'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router'
import { determinePortrait } from './helpers'

class ListView extends Component {
  componentWillMount() {
    if (this.props.location.pathname === '/favorites') {
      this.props.fetchFavorites()
    }
  }

  viewImage(image) {
    this.props.changeCurrentImage(image)
    if (this.props.location.pathname === '/feed') {
      this.context.router.push('/image')
    } else if (this.props.location.pathname === '/favorites') {
      this.context.router.push('/favorite')
    }
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
      <div className="list-view">
        <button onClick={this.props.updateFeed}>Fetch More</button>
        <Pagination path={this.props.location.pathname} numberOfPages={this.props.images.length} />
        <section className="wrap">
          {this.renderImages.call(this)}
        </section>
        <Pagination path={this.props.location.pathname} numberOfPages={this.props.images.length} />
      </div>
    )
  }
}

ListView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToPropsFeed(state) {
  console.log('state in feed', state)
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
const Favorites = connect(mapStateToPropsFavorites, { changeCurrentImage, fetchFavorites })(ListView)

export {
  Feed,
  Favorites
}