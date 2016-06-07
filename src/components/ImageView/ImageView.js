import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTags } from './helpers'
import { addFavorite, removeFavorite, favoriteStatus, changeCurrentImage } from '../../actions'

class ImageView extends Component {
  componentWillMount() {
    const image = this.props.image
    if (!image) {
      this.context.router.push('/feed')
    }
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
      return <button className="btn btn-danger" onClick={this.deleteFavorite.bind(this, image._id)} >Remove Favorite</button>
    } else if (image.favorite || !this.props.auth) {
      return <button className="btn btn-primary" disabled>Favorite</button>
    } else {
      return <button className="btn btn-primary" onClick={this.favorite.bind(this, image)} >Favorite</button>
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
      id: '1'
    }
    console.log('image', image)
    return (
      <article className='image-view'>
        <img src={image.media ? image.media.m : image.url} />
        <h4>{image.title}</h4>
        <a href={image.link} target="_blank">View on Flickr</a>
        <p>published: {image.published}</p>
        <p>by: {image.author}</p>
        <button onClick={() => console.log(image)}>show image</button>
        <div>
          Tags: 
          {renderTags(image.tags)}
        </div>
        {this.showButton(image)}
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