import { expect } from 'chai'

import reducer from '../../src/reducers/favorites_reducer'
import { FETCH_FAVORITES } from '../../src/actions/types'


describe('favorites reducer', () => {

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

