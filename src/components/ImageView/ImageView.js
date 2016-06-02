import React, { Component } from 'react'
import { connect } from 'react-redux'

class ImageView extends Component {
  
  componentWillMount() {
    const image = this.props.image
    if (!image.title) {
      this.context.router.push('/feed')
    }
  }

  renderTags(tags) {
    const tagsList = this.props.image.tags.split(' ')
    return tagsList.map((tag, i) => 
      <span style={{ marginRight: '2px' }} className="label label-success">{tag}</span> 
    )
  }
  
  render() {
    const image = this.props.image
    return (
      <article className='image-view'>
        <img src={image.media.m} />
        <h4>{image.title}</h4>
        <a href={image.link} target="_blank">View on Flickr</a>
        <p>published: {image.published}</p>
        <p>by: {image.author}</p>
        <div>
          Tags: 
          {this.renderTags.call(this)}
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