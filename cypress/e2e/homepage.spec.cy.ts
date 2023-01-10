describe('country homepage spec', () => {
  it('home page filter works', () => {
    cy.visit('http://localhost:4200/');
    cy.viewport('macbook-15')
    cy.get('[data-testid="country-search"]').type('ger');
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 4)
    cy.get('[data-testid="country-search"]').type('many');
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 1)
    cy.get('[data-testid="country-search"]').clear();
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 250)
  })

  it('home page dropdown works', () => {
    cy.visit('http://localhost:4200/');
    cy.viewport('macbook-15')
    cy.get('[data-testid="region-search"]').select(1);
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 59)
    cy.get('[data-testid="region-search"]').select(2);
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 56)
    cy.get('[data-testid="region-search"]').select(3);
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 50)
    cy.get('[data-testid="region-search"]').select(4);
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 53)
    cy.get('[data-testid="region-search"]').select(5);
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 27)
  })

  it('home page dropdown and filter together works', () => {
    cy.visit('http://localhost:4200/');
    cy.viewport('macbook-15')
    cy.get('[data-testid="region-search"]').select(1);
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 59)
    cy.wait(5000)
    cy.get('[data-testid="country-search"]').should('exist').type('a');
    cy.wait(5000)
    cy.get('[data-testid="country-search"]').should('exist').type('b');
    cy.get('[data-testid="country-card"]').should("exist").should("have.length", 2)
    
  })
})