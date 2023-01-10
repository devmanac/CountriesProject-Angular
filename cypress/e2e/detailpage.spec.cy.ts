describe('country detail page spec', () => {
    it('detail page  works', () => {
      cy.viewport('macbook-15')
      cy.visit('http://localhost:4200/');
      cy.get('[data-testid="country-card"]').should("exist").contains('Germany').click();
      cy.get('[data-testid="border-country"]').should("exist").contains('Belgium').click();
      cy.get('[data-testid="back-button"]').should("exist").click();
      cy.get('[data-testid="country-card"]').should("exist").should("have.length", 250)
    })
  })