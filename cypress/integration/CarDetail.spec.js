import { UI_HOST } from '../../src/config.js'

// END-TO-END or INTEGRATION TEST SUITE FOR CAR LISTING

context('Car Detail', () => {

  beforeEach(() => {
    cy.visit(`${UI_HOST}/cars/19XFC2F59GE2276732016`)
  })

  it('favorite initializes to false', () => {
    cy.get('[data-test="favorite"] > svg').should('have.attr', 'fill', 'gray')
  })

  it('favorite persists to car listing page', () => {
    cy.get('[data-test="favorite"]').click()
      .visit(UI_HOST)
      .get('[data-test="favorite"] > svg').first().should('have.attr', 'fill', 'red')
  })

  it('mileage slider updates fees when dragged', () => {
    const oldValue1 = cy.get('[data-test="monthly-fee"]')
    const oldValue2 = cy.get('[data-test="start-fee"]')
    cy.get('[data-test="slider"]').invoke('val', 1)
      .trigger('change')
    const newValue1 = cy.get('[data-test="monthly-fee"]')
    const newValue2 = cy.get('[data-test="start-fee"]')
    expect(oldValue1).to.not.equal(newValue1)
    expect(oldValue1).to.not.equal(newValue2)
  })

  it('tax toggler updates fees when toggled', () => {
    const oldValue1 = cy.get('[data-test="monthly-fee"] > span')
    const oldValue2 = cy.get('[data-test="start-fee"] > span')
    cy.get('[data-test="toggler"]').click()
    const newValue1 = cy.get('[data-test="monthly-fee"] > span')
    const newValue2 = cy.get('[data-test="start-fee"] > span')
    expect(oldValue1).to.not.equal(newValue1)
    expect(oldValue1).to.not.equal(newValue2)
  })

})
