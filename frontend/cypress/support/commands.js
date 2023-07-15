// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('getThrough', () => {
  cy.clearLocalStorage()
  cy.fixture('images.json').as('imageData')
  cy.fixture('storyChapters.json').as('storyData')
  cy.fixture('dropdowns.json').as('dropdownData')
  cy.get('@dropdownData').then((data) => {
    cy.intercept('GET', '/populate', data).as(
      'dropdownRequest'
    )
  })
  cy.visit('/')
  cy.get('@imageData').then((data) => {
    cy.intercept('POST', '/images', { imgUrl: data.imgUrl }).as(
      'imageRequest'
    )
  })
  cy.get('@storyData').then((data) => {
    cy.intercept('POST', '/story', { storyText: data.storyText }).as(
      'storyRequest'
    )
  })
  cy.get(':nth-child(1) > .css-b62m3t-container > .css-13cymwt-control').click()
  cy.get('#react-select-3-listbox').first().click()
  cy.get(':nth-child(2) > .css-b62m3t-container > .css-13cymwt-control').click()
  cy.get('#react-select-5-listbox').first().click()
  cy.get(':nth-child(3) > .css-b62m3t-container > .css-13cymwt-control').click()
  cy.get('#react-select-7-listbox').first().click()
  cy.get('.text-input-input').type('going to the shops')
  cy.get('.formcontainer-submit-button').click()
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
