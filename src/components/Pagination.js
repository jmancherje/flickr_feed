import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFeedPage } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Pagination extends Component {
  
  linkClassName(pageNumber) {
    return this.props.feedPage === pageNumber ? 
      "page-item active" :
      "page-item"
  }

  pageList() {
    const pages = []
    const self = this
    let start = 1, 
        end = this.props.numberOfPages

    if (this.props.numberOfPages > 6) {
      if (this.props.feedPage > 3 && this.props.feedPage < this.props.numberOfPages - 3) {
        start = this.props.feedPage - 3
        end = this.props.feedPage + 3
      } else if (this.props.feedPage <= 3) {
        end = 7
      } else if (this.props.feedPage >= this.props.numberOfPages - 3) {
        start = this.props.numberOfPages - 6
      }
    }
    for (let i = start; i <= end; i++) {
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
          <ReactCSSTransitionGroup transitionAppearTimeout={500} 
                                   transitionEnterTimeout={500} 
                                   transitionAppear={true} 
                                   transitionLeaveTimeout={50} 
                                   transitionName={ {
                                      enter: 'enter',
                                      enterActive: 'enter-active',
                                      leave: 'leave',
                                      leaveActive: 'leave-active',
                                      appear: 'appear',
                                      appearActive: 'appearActive'} 
                                   }>
            {this.pageList.call(this)}
          </ReactCSSTransitionGroup>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return state.ui
}

export default connect(mapStateToProps, { changeFeedPage })(Pagination)