import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderTags } from './helpers'

class ImageView extends Component {
  componentWillMount() {
    const image = this.props.image
    if (!image) {
      this.context.router.push('/feed')
    }
  }

  render() {
    // to prevent crashing before a redirect back to feed on page refresh
    const image = this.props.image || {
      media: { m: ''},
      title: 'hello',
      published: 'hello',
      author: 'hello',
      tags: 'tags'
    }
    return (
      <article className='image-view'>
        <img src={image.media.m} />
        <h4>{image.title}</h4>
        <a href={image.link} target="_blank">View on Flickr</a>
        <p>published: {image.published}</p>
        <p>by: {image.author}</p>
        <div>
          Tags: 
          {renderTags(image.tags)}
        </div>
        <button className="btn btn-primary">Favorite</button>
      </article>
    )
  }
}

ImageView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    image: state.currentImage
  }
}

export default connect(mapStateToProps)(ImageView)