import { expect } from 'chai'

import reducer from '../../src/reducers/auth_reducer'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from '../../src/actions/types'


describe('auth reducer', () => {

  it('handles unknown action types', () => {
    const initialState = {}
    const action = { type: 'authenticate' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal(initialState)
  })

  describe('AUTH_USER', () => {
    it('initially sets user authenticated to true', () => {
      const initialState = {}
      const action = { type: AUTH_USER }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        authenticated: true,
        error: ''
      })
    })

    it('changes authenticated: false to true', () => {
      const initialState = { authenticated: false }
      const action = { type: AUTH_USER }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        authenticated: true,
        error: ''
      })
    })

    it('clears any existing auth error message', () => {
      const initialState = { authenticated: false, error: 'invalid login credentials' }
      const action = { type: AUTH_USER }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        authenticated: true,
        error: ''
      })
    })    
  })

  describe('UNAUTH_USER', () => {
    it('changes authenticated: true to false', () => {
      const initialState = { authenticated: true }
      const action = { type: UNAUTH_USER }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        authenticated: false,
        error: ''
      })
    })

    it('clears any existing auth error message', () => {
      const initialState = { authenticated: false, error: 'invalid login credentials' }
      const action = { type: UNAUTH_USER }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ 
        authenticated: false,
        error: ''
      })
    })    
  })

  describe('AUTH_ERROR', () => {
    it('creates an auth error message', () => {
      const initialState = {}
      const action = { type: AUTH_ERROR, errorMessage: 'email already exists' }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        error: 'email already exists'
      })
    })

    it('overrides an existing auth error message', () => {
      const initialState = { error: 'invalid login credentials' }
      const action = { type: AUTH_ERROR, errorMessage: 'email already exists' }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({
        error: 'email already exists'
      })
    })

    it('doesn\'t change authenticated state', () => {
      const initialState = { authenticated: false, error: '' }
      const action = { type: AUTH_ERROR, errorMessage: 'email already exists' }

      const nextState = reducer(initialState, action)

      expect(nextState).to.deep.equal({ error: 'email already exists', authenticated: false })
    })
  })

})

