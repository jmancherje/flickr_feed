import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFeedPage, changeFavoritesPage } from '../../actions'
import { pageLinks } from './PageLink'
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
      console.log('changing favorites page')
      this.props.changeFavoritesPage(page)
    }
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
            {pageLinks(this.handlePageChange.bind(this), this.props.numberOfPages, this.props.feedPage, this.props.favoritesPage, this.props.currentView, this.linkClassName.bind(this))}
          </ReactCSSTransitionGroup>
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

// function mapStateToPropsFavorites(state) {
//   return {
//     currentPage: state.ui.favoritesPage,
//     currentView: state.ui.currentView
//   }
// }

// function mapStateToPropsFeed(state) {
//   return {
//     currentPage: state.ui.feedPage,
//     currentView: state.ui.currentView
//   }
// }

// const FavoritesPagination = connect(mapStateToPropsFavorites, { changeFavoritesPage })(Pagination)
// const FeedPagination = connect(mapStateToPropsFeed, { changeFeedPage })(Pagination)

// export {
//   FavoritesPagination,
//   FeedPagination
// }

export default connect(mapStateToProps, { changeFeedPage, changeFavoritesPage })(Pagination)