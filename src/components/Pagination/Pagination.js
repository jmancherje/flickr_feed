import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFeedPage } from '../../actions'
import { pageLinks } from './PageLink'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Pagination extends Component {
  
  linkClassName(pageNumber) {
    return this.props.feedPage === pageNumber ? 
      "page-item active" :
      "page-item"
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
            {pageLinks(this.handlePageChange.bind(this), this.props.numberOfPages, this.props.feedPage, this.linkClassName.bind(this))}
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