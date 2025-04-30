describe('Login Flow', () => {
  it('Debería poder abrir la creación de productos', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/login');

    cy.get('#email').type('admin@quickduck.com');
    cy.get('#password').type('admin123');
    cy.get('.primary').click();
    cy.wait(2500);
    cy.get(':nth-child(7) > a').click();
  });
});
