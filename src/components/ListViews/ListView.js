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
    this.path = this.props.location.pathname
    if (this.path === '/favorites') {
      this.props.fetchFavorites()
    }
  }

  viewImage(image) {
    this.props.changeCurrentImage(image)
    if (this.path === '/feed') {
      this.context.router.push('/image')
    } else if (this.path === '/favorites') {
      this.context.router.push('/favorite')
    }
  }

  renderImages() {
    const page = this.props.pageNumber - 1
    if (this.props.fetching && this.props.images.length === 0) {
      return <img src="./assets/flickr.gif" alt="flickr spinner" className="center-block" />
    } else if (this.props.images.length === 0 && this.path === '/favorites') {
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

  updateFeed(event) {
    event.preventDefault()
    this.props.updateFeed()
  }

  changePageSize(event, pageSize) {
    event.preventDefault()
    if (this.path === '/feed') {
      return this.props.changeFeedPageSize(pageSize)
    } else {
      return this.props.changeFavoritesPageSize(pageSize)
    }
  }

  render() {
    return (
      <div>
        <h2 className="center-title">{this.props.title}</h2>
        {this.path !== '/feed' ? '' : <p className="font-italic text-muted center-title">
          New images from Flickr every 60 seconds
          or load more <a href="#" onClick={this.updateFeed.bind(this)}>manually</a>
        </p>}
        <div className="list-view">
          <Pagination pageSize={this.props.pageSize} 
                      path={this.path} 
                      numberOfPages={this.props.images.length} 
                      changePageSize={this.changePageSize.bind(this)} />
          <hr/>
          <section className="wrap">
            {this.renderImages.call(this)}
          </section>
          <hr/>
          <Pagination pageSize={this.props.pageSize} 
                      path={this.path} 
                      numberOfPages={this.props.images.length} 
                      changePageSize={this.changePageSize.bind(this)} />
        </div>
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
    pageSize: state.images.pageSize,
    title: 'Flickr Feed'
  }
}

function mapStateToPropsFavorites(state) {
  return {
    images: state.favorites.images,
    pageNumber: state.ui.favoritesPage,
    fetching: state.favorites.fetching,
    pageSize: state.favorites.pageSize,
    title: 'Favorites'
  }
}

const Feed = connect(mapStateToPropsFeed, { updateFeed, changeCurrentImage, changeFeedPageSize })(ListView)
const Favorites = connect(mapStateToPropsFavorites, { changeCurrentImage, fetchFavorites, changeFavoritesPageSize })(ListView)

export {
  Feed,
  Favorites
}