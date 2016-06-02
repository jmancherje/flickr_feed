import React from 'react'

const ImageCard = ({
  viewImage,
  imageData,
  portrait
}) => (
  <figure className='image-card'>
    <img className={portrait ? 'portrait' : 'landscape'} src={imageData.media.m} /> 
  </figure>
)

export default ImageCard