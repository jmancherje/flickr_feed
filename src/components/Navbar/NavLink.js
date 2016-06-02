import React from 'react'
import { Link } from 'react-router'

export default ({
  linkClass,
  link
}) => (
  <li className="nav-item">
    <Link className={linkClass} to={link.to}>{link.text}</Link>
  </li>
)
