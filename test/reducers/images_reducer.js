import { expect } from 'chai'

import reducer from '../../src/reducers/images_reducer'
import dummy_data from '../dummy_data'


describe('images reducer', () => {

  it('formats initial fetch correctly', () => {
    const flickrData = {
      title: "dummy title",
      items: [{ title: 'image1' }, { title: 'image2' }]
    }
    const initialState = []
    const action = { type: 'FETCH_IMAGES', payload: flickrData }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal([[{ title: 'image1' }, { title: 'image2' }]])
  })

  it('formats subsequent fetch calls into new nested arrays', () => {
    const flickrData = {
      title: "another dummy title",
      items: [{ title: 'image3' }, { title: 'image4' }]
    }
    const initialState = [[{ title: 'image1' }, { title: 'image2' }]]
    const action = { type: 'FETCH_IMAGES', payload: flickrData }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal([[{ title: 'image1' }, { title: 'image2' }], [{ title: 'image3' }, { title: 'image4' }]])
  })

  it('handles unknown/unrelated action types', () => {
    const initialState = []
    const action = { type: 'FETCH_IMGS' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal(initialState)
  })
})

