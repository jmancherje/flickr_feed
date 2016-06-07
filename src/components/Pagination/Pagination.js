import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFeedPage, changeFavoritesPage } from '../../actions'
import { pageLinks } from './PageLink'
import { pageSizes } from './PageSizeLinks'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Pagination extends Component {
  
  linkClassName(pageNumber) {
    if (this.props.path === '/feed') {
      return this.props.feedPage === pageNumber ? 
        "page-item active" :
        "page-item"
    } else {
      return this.props.favoritesPage === pageNumber ? 
        "page-item active" :
        "page-item"
    }
  }

  handlePageChange(e, page) {
    e.preventDefault()
    if (this.props.path === '/feed') {
      this.props.changeFeedPage(page)
    } else {
      this.props.changeFavoritesPage(page)
    }
  }

  render() {
    if (this.props.numberOfPages === 0) {
      return null
    }
    return (
      <nav className="pagination-nav">
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
            {pageLinks(this.handlePageChange.bind(this), this.props.numberOfPages, this.props.feedPage, this.props.favoritesPage, this.props.currentView, this.linkClassName.bind(this))}
          </ReactCSSTransitionGroup>
        </ul>
        <ul className="pagination hidden-xs-down" style={{ float: 'right' }}>
          {pageSizes(this.props.pageSize, this.props.changePageSize)}
        </ul>
      </nav>
    )
  }
}

Pagination.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return state.ui
}

export default connect(mapStateToProps, { changeFeedPage, changeFavoritesPage })(Pagination)