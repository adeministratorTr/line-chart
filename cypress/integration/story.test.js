/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Home Page', () => {
  it('should render chart', () => {
    cy.visit('/')
    cy.get('[data-testid="StoryInputs"]')
      .find('input')
      .should('have.value', 10)

    cy.get('[data-testid="StoryInputs"]')
      .find('input')
      .clear()
      .type(3)
    
    cy.get('[data-testid="StoryInputs"]')
      .find('button')
      .click()

    cy.get('[data-testid="LineChart"]').should('be.visible')
  })

  it('should disable button when number of stories not in range', () => {
    cy.visit('/')
    cy.get('[data-testid="StoryInputs"]')
      .find('input')
      .should('have.value', Cypress.env('DEFAULT_STORY_NUMBER'))

    cy.get('[data-testid="StoryInputs"]')
      .find('input')
      .clear()
      .type(Cypress.env('MAX_STORY_NUMBER') + 1)
    
    cy.get('[data-testid="StoryInputs"]')
      .find('button')
      .should('be.disabled')

    cy.get('[data-testid="StoryInputs"]')
      .find('input')
      .clear()
      .type('0')
    
    cy.get('[data-testid="StoryInputs"]')
      .find('button')
      .should('be.disabled')
  })
})