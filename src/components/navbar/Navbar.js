import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import NavLink from './NavLink'

const links = [{
  to: '/feed',
  text: 'Feed'
}, {
  to: '/favorites',
  text: 'Favorites'
}]

class Navbar extends Component {
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
              <NavLink key={link.text} linkClass={`nav-link ${this.activeLink.call(this, link) ? 'active-link' : ''}`} link={link} />
              // <li className="nav-item" key={link.text}>
              //   <Link className={`nav-link ${this.activeLink.call(this, link) ? 'active-link' : ''}`} to={link.to}>{link.text}</Link>
              // </li>
            )}
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
  return state.ui
}

export default connect(mapStateToProps)(Navbar)