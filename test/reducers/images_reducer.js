import { expect } from 'chai'

import reducer from '../../src/reducers/images_reducer'
import { 
  FETCH_IMAGES, 
  FETCH_IMAGES_REQUEST, 
  TOGGLE_FEED_FAVORITE, 
  CHANGE_FEED_PAGE_SIZE, 
  SPLIT_FEED_PAGES } from '../../src/actions/types'


describe('images reducer', () => {

  it('handles unknown/unrelated action types', () => {
    const initialState = []
    const action = { type: 'FETCH_IMGS' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal(initialState)
  })

  describe('FETCH_IMAGES', () => {
    it('formats initial fetch correctly', () => {
      const flickrData = {
        title: "dummy title",
        items: [{ title: 'image1' }, { title: 'image2' }]
      }
      const initialState = {
        images: [],
        pageSize: 5,
        fetching: false
      }
      const action = { type: FETCH_IMAGES, payload: flickrData }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 5,
        fetching: false
      })
    })

    it('formats subsequent fetch calls into separate pages if there are more items than page size', () => {
      const flickrData = {
        title: "another dummy title",
        items: [{ title: 'image3' }, { title: 'image4' }]
      }
      const initialState = { 
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 3,
        fetching: false
      }
      const action = { type: FETCH_IMAGES, payload: flickrData }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        images: [[{ title: 'image1' }, { title: 'image2' }, { title: 'image3' }], [{ title: 'image4' }]],
        pageSize: 3,
        fetching: false
      })
    })

    it('changes fetching status to false when successfully fetched images', () => {
      const flickrData = {
        title: "another dummy title",
        items: [{ title: 'image3' }, { title: 'image4' }]
      }
      const initialState = { 
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 3,
        fetching: true
      }
      const action = { type: FETCH_IMAGES, payload: flickrData }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        images: [[{ title: 'image1' }, { title: 'image2' }, { title: 'image3' }], [{ title: 'image4' }]],
        pageSize: 3,
        fetching: false
      })
    })
  })

  describe('FETCH_IMAGES_REQUEST', () => {
    it('changes fetching status to true', () => {
      const initialState = { 
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 3,
        fetching: false
      }

      const action = { type: FETCH_IMAGES_REQUEST }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 3,
        fetching: true
      })
    })
  })

  describe('TOGGLE_FEED_FAVORITE', () => {
    it('toggles favorite: true on correct image', () => {
      const initialState = { 
        images: [[{ title: 'image1', link: 'http://google.com/image1' }, { title: 'image2', link: 'http://google.com/image2' }]],
        pageSize: 3,
        fetching: false
      }

      const action = { type: TOGGLE_FEED_FAVORITE, image: { title: 'image2', link: 'http://google.com/image2' } }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image1', link: 'http://google.com/image1' }, { title: 'image2', link: 'http://google.com/image2', favorite: true }]],
        pageSize: 3,
        fetching: false
      })
    })
  })

  describe('CHANGE_FEED_PAGE_SIZE', () => {
    it('changes the curreng feed page size', () => {
      const initialState = { 
        images: [[{ title: 'image1', link: 'http://google.com/image1' }, { title: 'image2', link: 'http://google.com/image2' }]],
        pageSize: 3,
        fetching: false
      }

      const action = { type: CHANGE_FEED_PAGE_SIZE, newSize: 20 }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image1', link: 'http://google.com/image1' }, { title: 'image2', link: 'http://google.com/image2' }]],
        pageSize: 20,
        fetching: false
      })
    })
  })

  describe('SPLIT_FEED_PAGES', () => {
    it('splits the images state into pages depending on the current pageSize', () => {
      const initialState = { 
        images: [[
          { title: 'image1', link: 'http://google.com/image1' }, 
          { title: 'image2', link: 'http://google.com/image2' },
          { title: 'image3', link: 'http://google.com/image3' },
          { title: 'image4', link: 'http://google.com/image4' },
          { title: 'image5', link: 'http://google.com/image5' }
        ]],
        pageSize: 3,
        fetching: false
      }

      const action = { type: SPLIT_FEED_PAGES }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[
          { title: 'image1', link: 'http://google.com/image1' }, 
          { title: 'image2', link: 'http://google.com/image2' },
          { title: 'image3', link: 'http://google.com/image3' }],
          [{ title: 'image4', link: 'http://google.com/image4' },
          { title: 'image5', link: 'http://google.com/image5' }
        ]],
        pageSize: 3,
        fetching: false
      })
    })
  })
  
})

