import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFeedPage } from '../actions'

class Pagination extends Component {
  
  linkClassName(pageNumber) {
    console.log(this.props.feedPage, pageNumber)
    return this.props.feedPage === pageNumber ? 
      "page-item active" :
      "page-item"
  }

  pageList() {
    const pages = []
    const self = this
    for (let i = 1; i <= this.props.numberOfPages; i++) {
      pages.push(
        <li className={this.linkClassName.call(this, i)} key={i}>
          <a className="page-link"
             href="#" 
             onClick={(event) => {this.handlePageChange.call(this, event, i)}}>{ i }</a>
        </li>)
    }
    return pages
  }

  handlePageChange(e, page) {
    e.preventDefault()
    this.props.changeFeedPage(page)
  }

  render() {
    return (
      <nav>
        <ul className="pagination">
          {this.pageList.call(this)}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return state.ui
}

export default connect(mapStateToProps, { changeFeedPage })(Pagination)