describe('Login Flow', () => {
  it('Debería poder abrir la creación de productos y llenar el formulario', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/login');

    cy.get('#email').type('admin@quickduck.com');
    cy.get('#password').type('admin123');
    cy.get('.primary').click();
    
    cy.get('[routerlink="/productos/masivo"]').click();

    cy.get('.validate-button').click();
  });
});
