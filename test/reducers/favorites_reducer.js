import { expect } from 'chai'

import reducer from '../../src/reducers/favorites_reducer'
import { 
  FETCH_FAVORITES, 
  FETCH_FAVORITES_REQUEST,
  CHANGE_FAVORITES_PAGE_SIZE,
  SPLIT_FAVORITES_PAGES } from '../../src/actions/types'


describe('favorites reducer', () => {

  it('handles unknown action types', () => {
    const initialState = { 
      images: [],
      pageSize: 4,
      fetching: false
    }
    const action = { type: 'unknown' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({ 
      images: [],
      pageSize: 4,
      fetching: false
    })


  })

  describe('FETCH_FAVORITES', () => {
    it('handles initial FETCH_FAVORITES starting with empty state', () => {
      const favorites = [{ title: 'image3' }, { title: 'image4' }]
      const initialState = { 
        images: [],
        pageSize: 4,
        fetching: false
      }
      const action = { type: FETCH_FAVORITES, payload: { data: favorites } }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image3' }, { title: 'image4' }]],
        pageSize: 4,
        fetching: false
      })
    })

    it('handles subsequent FETCH_FAVORITES, and overwrite existing favorites', () => {
      const favorites = [{ title: 'image3' }, { title: 'image4' }, { title: 'image5' }]
      const initialState = { 
        images: [[{ title: 'image3' }, { title: 'image4' }]],
        pageSize: 4,
        fetching: false
      }
      const action = { type: FETCH_FAVORITES, payload: { data: favorites } }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image3' }, { title: 'image4' }, { title: 'image5' }]],
        pageSize: 4,
        fetching: false
      })
    })  

    it('returns an empty, unnested array if NO favorites are present', () => {
      const favorites = []
      const initialState = {
        images: [],
        pageSize: 10,
        fetching: false
      }
      const action = { type: FETCH_FAVORITES, payload: { data: favorites } }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        images: [],
        pageSize: 10,
        fetching: false
      })
    })
  })

  describe('FETCH_FAVORITES_REQUEST', () => {
    it('changes fetching status to true', () => {
      const initialState = { 
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 3,
        fetching: false
      }

      const action = { type: FETCH_FAVORITES_REQUEST }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image1' }, { title: 'image2' }]],
        pageSize: 3,
        fetching: true
      })
    })
  })

  describe('CHANGE_FAVORITES_PAGE_SIZE', () => {
    it('changes the curreng feed page size', () => {
      const initialState = { 
        images: [[{ title: 'image1', link: 'http://google.com/image1' }, { title: 'image2', link: 'http://google.com/image2' }]],
        pageSize: 3,
        fetching: false
      }

      const action = { type: CHANGE_FAVORITES_PAGE_SIZE, newSize: 20 }
      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        images: [[{ title: 'image1', link: 'http://google.com/image1' }, { title: 'image2', link: 'http://google.com/image2' }]],
        pageSize: 20,
        fetching: false
      })
    })
  })

  describe('SPLIT_FAVORITES_PAGES', () => {
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

      const action = { type: SPLIT_FAVORITES_PAGES }
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

