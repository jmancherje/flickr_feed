import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function(WrappedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  Authentication.conextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}