import { expect } from 'chai'

import reducer from '../../src/reducers/images_reducer'
import { FETCH_IMAGES } from '../../src/actions/types'


describe('images reducer', () => {

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

  it('handles unknown/unrelated action types', () => {
    const initialState = []
    const action = { type: 'FETCH_IMGS' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal(initialState)
  })
})

