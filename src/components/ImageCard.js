import React from 'react'

const ImageCard = ({
  viewImage,
  imageData,
  portrait
}) => (
  <div className='box'>
    <div className="innerContent">
      <img className={portrait ? 'portrait' : 'landscape'}
           src={imageData.media ? imageData.media.m : imageData.url} 
           onClick={viewImage.bind(this, imageData)} /> 
    </div>
  </div>
)

export default ImageCard

// <figure className='image-card'>
//   <img className={portrait ? 'portrait' : 'landscape'} 
//        src={imageData.media ? imageData.media.m : imageData.url} 
//        onClick={viewImage.bind(this, imageData)} /> 
// </figure>