import { UI_HOST } from '../../src/config.js'

// END-TO-END or INTEGRATION TEST SUITE FOR CAR LISTING

context('Car List', () => {

  const obj = {
    getCars () {}
  }

  beforeEach(() => {
    cy.visit(UI_HOST)
  })

  it('persists favorites to car detail page', () => {
    cy.get('[data-test="favorite"]').first().click()
      .get('[data-test="card"]').first().click()
      .location().should((loc => {
        expect(loc.pathname).to.eq('/cars/19XFC2F59GE2276732016')
    }))
      .get('[data-test="favorite"] > svg').should('have.attr', 'fill', 'red')
  })

  it('redirects to car detail page when a card is clicked', () => {
    cy.get('[data-test="card"]').first().click()
      .location().should((loc => {
        expect(loc.pathname).to.contain('/cars/')
      }))
  })

  // INFINITE SCROLLING TEST ONLY PASSES IN INTERACTIVE TEST RUNNER
  // it('loads more cards when scrolled to bottom', () => {
  //   cy.scrollTo('bottom')
  //   cy.get('[data-test="card"]').should(cards => {
  //       expect(cards).to.have.length.greaterThan(10)
  //     })
  // })

})
