import { expect } from 'chai'

import reducer from '../../src/reducers/ui_reducer'
import { CHANGE_VIEW, CHANGE_FEED_PAGE, CHANGE_FAVORITES_PAGE } from '../../src/actions/types'

describe('ui reducer', () => {

  it('handles unknown action types', () => {
    const initialState = {
      feedPage: 1,
      favoritesPage: 1,
      currentView: 'feed'
    }
    const action = { type: 'authenticate' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal(initialState)
  })

  describe('CHANGE_FEED_PAGE', () => {
    it('changes only the feed page', () => {
      const initialState = {
        feedPage: 1,
        favoritesPage: 1,
        currentView: 'feed'
      }
      const action = { type: CHANGE_FEED_PAGE, newPage: 14 }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        feedPage: 14,
        favoritesPage: 1,
        currentView: 'feed'
      })
    })
  })

  describe('CHANGE_FAVORITES_PAGE', () => {
    it('changes only the favorites page', () => {
      const initialState = {
        feedPage: 1,
        favoritesPage: 1,
        currentView: 'feed'
      }
      const action = { type: CHANGE_FAVORITES_PAGE, newPage: 14 }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        feedPage: 1,
        favoritesPage: 14,
        currentView: 'feed'
      })
    })
  })

  describe('CHANGE_VIEW', () => {
    it('changes only the currentView', () => {
      const initialState = {
        feedPage: 1,
        favoritesPage: 1,
        currentView: 'feed'
      }
      const action = { type: CHANGE_VIEW, newView: 'favorites' }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        feedPage: 1,
        favoritesPage: 1,
        currentView: 'favorites'
      })
    })
  })
})

