import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTags } from './helpers'
import { determinePortrait } from '../ListViews/helpers'
import { addFavorite, removeFavorite, favoriteStatus, changeCurrentImage } from '../../actions'

class ImageView extends Component {
  componentWillMount() {
    const image = this.props.image
    if (!image) {
      this.context.router.push('/feed')
    }
  }

  formatDate(date) {
    const split = date.split('T')
    return split[0]
  }

  deleteFavorite(id) {
    removeFavorite(id)
      .then(() => {
        this.context.router.push('/favorites')
      })
  }

  favorite(image) {
    addFavorite(image)
      .then(() => {
        this.props.favoriteStatus(image)
      })
  }

  showButton(image) {
    if (this.props.location.pathname === '/favorite') {
      return <button className="btn btn-danger favorite-btn" onClick={this.deleteFavorite.bind(this, image._id)} >Remove Favorite</button>
    } else if (image.favorite || !this.props.auth) {
      return <button className="btn btn-primary favorite-btn" disabled>Favorite</button>
    } else {
      return <button className="btn btn-primary favorite-btn" onClick={this.favorite.bind(this, image)} >Favorite</button>
    }
  }

  render() {
    // to prevent crashing before a redirect back to feed on page refresh
    const image = this.props.image || {
      media: { m: ''},
      title: 'hello',
      published: 'hello',
      author: 'hello',
      tags: 'tags',
      id: '1',
      description: ''
    }

    return (
      <article className='image-view'>
        <div className="display-image-row row">
          <div className={`${determinePortrait(image) ? 'portrait' : 'landscape'} col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 col-xl-6 col-xl-offset-3 image-container`}>
            <img className={`image-large ${determinePortrait(image) ? 'portrait' : 'landscape'}`} src={image.media ? image.media.m : image.url} />
          </div>
          <h4 className="back-button" onClick={() => this.context.router.goBack()}>X</h4>
        </div>
        <hr/>
        <div className="flickr-data col-sm-6 col-sm-offset-3">
          <h4>Title: {image.title}</h4>
          <p>published: {this.formatDate(image.published)}</p>
          <p>by: {image.author}</p>
          {this.showButton(image)}
          <div>
            Tags: &nbsp;
            {renderTags(image.tags)}
          </div>
          <a href={image.link} target="_blank">View on Flickr</a>
        </div>
      </article>
    )
  }
}

ImageView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log('allstate', state)
  return {
    image: state.currentImage,
    auth: state.auth.authenticated
  }
}

export default connect(mapStateToProps, { favoriteStatus, changeCurrentImage })(ImageView)