import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import NavLink from './NavLink'
import { signoutUser } from '../../actions'

const links = [{
  to: '/feed',
  text: 'Feed'
}, {
  to: '/favorites',
  text: 'Favorites'
}]

class Navbar extends Component {
  signout(e) {
    e.preventDefault()
    this.props.signoutUser()
    this.context.router.push('/feed')
  }

  activeLink(link) {
    return link.to === this.props.location
  }

  render() {
    return (
      <nav className="navbar navbar-full navbar-dark bg-inverse" >
        <div className="in-desktop full-width col-xl-10 col-xl-offset-1">
          <Link className="navbar-brand" to="/">Flickr Feed</Link>
          <ul className="nav navbar-nav">
            {links.map(link => 
              <NavLink key={link.text} linkClass={`nav-link ${this.activeLink.call(this, link) ? 'active' : ''}`} link={link} />
            )}
            <li className="nav-item pull-xs-right">
              {this.props.auth.authenticated ? 
                <a className="nav-link" href="#" onClick={this.signout.bind(this)}>Sign out</a> :
                <Link className="nav-link" to="/signup" >Register</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    auth: state.auth 
  }
}

export default connect(mapStateToProps, { signoutUser })(Navbar)