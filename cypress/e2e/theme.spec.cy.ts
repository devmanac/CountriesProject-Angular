describe('theme changer spec', () => {
  it('theme changing works', () => {
    cy.visit('http://localhost:4200/');
    cy.viewport('macbook-15')
    cy.get('[data-testid="header"]').should('exist').should('have.class', 'element-light-mode')
    cy.get('[data-testid="theme-changer"]').should('exist').click();
    cy.get('[data-testid="header"]').should('exist').should('have.class', 'element-dark-mode')
  })
})