import { expect } from 'chai'

import reducer from '../../src/reducers/favorites_reducer'
import dummy_data from '../dummy_data'


describe('favorites reducer', () => {

  it('handles UPDATE_PAGE_SIZE', () => {
    const favorites = {
      data: "other data",
      items: []
    }
    const initialState = {
      images: [],
      pageSize: 5
    }
    const action = { type: 'UPDATE_PAGE_SIZE', pageSize: 10 }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({ images: [], pageSize: 10 })
  })

  it('handles initial FETCH_FAVORITES starting with empty state', () => {
    const favorites = {
      data: "other data",
      items: [{ title: 'image3' }, { title: 'image4' }]
    }
    const initialState = { 
      images: [],
      pageSize: 4
    }
    const action = { type: 'FETCH_FAVORITES', payload: favorites }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({ 
      images: [[{ title: 'image3' }, { title: 'image4' }]],
      pageSize: 4
    })
  })

  it('handles subsequent FETCH_FAVORITES, and overwrite existing favorites', () => {
    const favorites = {
      data: 'unrelated data',
      items: [{ title: 'image3' }, { title: 'image4' }, { title: 'image5' }]
    }
    const initialState = { 
      images: [[{ title: 'image3' }, { title: 'image4' }]],
      pageSize: 4
    }
    const action = { type: 'FETCH_FAVORITES', payload: favorites }
    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({ 
      images: [[{ title: 'image3' }, { title: 'image4' }, { title: 'image5' }]],
      pageSize: 4
    })
  })
})

