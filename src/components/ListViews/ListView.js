import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  updateFeed, 
  changeCurrentImage, 
  fetchFavorites,
  changeFeedPageSize,
  changeFavoritesPageSize } from '../../actions'
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
    if (this.props.fetching && this.props.images.length === 0) {
      return <img src="./assets/flickr.gif" alt="flickr spinner" className="center-block" />
    } else if (this.props.images.length === 0 && this.props.location.pathname === '/favorites') {
      return <h4>You have no favorites yet! Go back to the <Link to="/feed">Feed</Link> and select some favorites!</h4>
    }
    return !this.props.images[page] ? null :
      this.props.images[page].map((item, index) => 
        <ImageCard viewImage={this.viewImage.bind(this)} 
                   imageData={item} 
                   key={index} 
                   portrait={determinePortrait(item)} />
      )
  }

  changePageSize(event, pageSize) {
    event.preventDefault()
    if (this.props.location.pathname === '/feed') {
      return this.props.changeFeedPageSize(pageSize)
    } else {
      return this.props.changeFavoritesPageSize(pageSize)
    }
  }

  render() {
    return (
      <div className="list-view">
        <button onClick={this.props.updateFeed}>Fetch More</button>
        <Pagination pageSize={this.props.pageSize} 
                    path={this.props.location.pathname} 
                    numberOfPages={this.props.images.length} 
                    changePageSize={this.changePageSize.bind(this)} />
        <section className="wrap">
          {this.renderImages.call(this)}
        </section>
        <Pagination pageSize={this.props.pageSize} 
                    path={this.props.location.pathname} 
                    numberOfPages={this.props.images.length} 
                    changePageSize={this.changePageSize.bind(this)} />
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
    pageNumber: state.ui.feedPage,
    fetching: state.images.fetching,
    pageSize: state.images.pageSize
  }
}

function mapStateToPropsFavorites(state) {
  return {
    images: state.favorites.images,
    pageNumber: state.ui.favoritesPage,
    fetching: state.favorites.fetching,
    pageSize: state.favorites.pageSize
  }
}

const Feed = connect(mapStateToPropsFeed, { updateFeed, changeCurrentImage, changeFeedPageSize })(ListView)
const Favorites = connect(mapStateToPropsFavorites, { changeCurrentImage, fetchFavorites, changeFavoritesPageSize })(ListView)

export {
  Feed,
  Favorites
}