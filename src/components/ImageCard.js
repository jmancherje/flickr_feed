import React from 'react'

function formatTitle(string, size) {
  // limit title length so it doesn't show before hover
  let title = string;
  if (!string) {
    title = 'untitled'
  } else if (string.length > size + 3) {
    title = string.substring(0, size + 1) + '...'
  }
  return <p className="titleBox" style={{ maxHeight: '50px' }}>{title}</p>
}

const ImageCard = ({
  viewImage,
  imageData,
  portrait
}) => {
  return (
    <div className='box'>
      <div className="boxInner">
        <img className={portrait ? 'portrait' : 'landscape'}
             src={imageData.media ? imageData.media.m : imageData.url} 
             onClick={viewImage.bind(this, imageData)} />
        {formatTitle(imageData.title, 25)}
      </div>
    </div>
  )
}

export default ImageCard