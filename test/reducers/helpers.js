import { expect } from 'chai'
import { splitIntoPages } from '../../src/reducers/helpers'

describe('reducer helpers / logic', () => {

  describe('splitIntoPages', () => {

    it('returns a single nested array when given empty input', () => {
      const items = []
      const pageSize = 20
      const allPages = splitIntoPages(items, pageSize)

      expect(allPages).to.deep.equal([[]])
    })

    it('partially fills a single page when total items are less than the page size', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      const pageSize = 20
      const allPages = splitIntoPages(items, pageSize)

      expect(allPages.length).to.equal(1)
      expect(allPages).to.deep.equal([[1, 2, 3, 4, 5, 6, 7, 8, 9]])
    })

    it('fills all pages when given a divisible number of items to number of pages', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      const pageSize = 3
      const allPages = splitIntoPages(items, pageSize)

      expect(allPages.length).to.equal(3)
      expect(allPages).to.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    })

    it('partially fills ONLY last page when not evenly divisible', () => {
      const items = [1, 2, 3, 4, 5, 6, 7]
      const pageSize = 3
      const allPages = splitIntoPages(items, pageSize)

      expect(allPages.length).to.equal(3)
      expect(allPages).to.deep.equal([[1, 2, 3], [4, 5, 6], [7]])
    })

  })

})