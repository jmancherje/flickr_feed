import { expect } from 'chai'

import reducer from '../../src/reducers/current_image_reducer'
import { CHANGE_CURRENT_IMAGE, FAVORITE_CURRENT_IMAGE } from '../../src/actions/types'


describe('current image reducer', () => {

  describe('CHANGE_CURRENT_IMAGE', () => {
    it('handles initial selection of current image', () => {
      const initialState = null
      const action = { type: CHANGE_CURRENT_IMAGE, image: { title: 'image', link: 'google.com/img' } }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ title: 'image', link: 'google.com/img' })
    })

    it('handles subsequent seletions of current image by overriding previous image', () => {
      const initialState = { title: 'image', link: 'google.com/img' }
      const action = { type: CHANGE_CURRENT_IMAGE, image: { title: 'image2', link: 'google.com/img2' } }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ title: 'image2', link: 'google.com/img2' })
    })  
  })

  describe('FAVORITE_CURRENT_IMAGE', () => {
    it('returns previous state if no current image is selected', () => {
      const initialState = null
      const action = { type: FAVORITE_CURRENT_IMAGE, image: { title: 'image', link: 'google.com/img' } }

      const nextState = reducer(initialState, action)

      expect(nextState).to.equal(null)
    })

    it('overrides existing current image with an identical image with favorite set to true', () => {
      const initialState = { title: 'image', link: 'google.com/img' }
      const action = { type: FAVORITE_CURRENT_IMAGE }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ title: 'image', link: 'google.com/img', favorite: true })
      expect(nextState).to.not.equal(initialState)
    })  
  })

})

