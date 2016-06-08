import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { signinUser, authError } from '../../actions'
import { Link } from 'react-router'

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }



  render() {
    const { handleSubmit, fields: { email, password }} = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h3>Log in</h3>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} type="email" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
        <p style={{ marginTop: '15px' }}>Not Registered? <Link to="/signup" onClick={() => this.props.authError('')}>Sign up here</Link></p>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, { signinUser, authError })(Signin)