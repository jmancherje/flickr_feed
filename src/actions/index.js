import axios from 'axios'
import jsonp from 'jsonp'

const ROOT_URL = 'http://localhost:8787'

export function updateFeed() {
  const request = new Promise(function (resolve, reject) {
    jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json', { name: 'jsonFlickrFeed' }, function(err, data) {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)
      }
    })
  })

  return {
    type: 'FETCH_IMAGES',
    payload: request
  }
}