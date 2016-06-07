import React from 'react'

const ImageCard = ({
  viewImage,
  imageData,
  portrait
}) => (
  <figure className='image-card'>
    <img className={portrait ? 'portrait' : 'landscape'} 
         src={imageData.media ? imageData.media.m : imageData.url} 
         onClick={viewImage.bind(this, imageData)} /> 
  </figure>
)

export default ImageCard