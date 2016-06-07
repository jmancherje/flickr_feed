export function determinePortrait(image) {
  const description = image.description
  const startWidth = description.indexOf('width="') + 7
  const endWidth = description.indexOf('"', startWidth)
  const width = +description.substring(startWidth, endWidth)

  const startHeight = description.indexOf('height="') + 8
  const endHeight = description.indexOf('"', startHeight)
  const height = +description.substring(startHeight, endHeight)

  const aspectRatio = width / height
  return aspectRatio < 1
}