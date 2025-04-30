describe('Login Flow', () => {
  it('Debería poder abrir la creación de productos y llenar el formulario', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/login');

    cy.get('#email').type('admin@quickduck.com');
    cy.get('#password').type('admin123');
    cy.get('.primary').click();

    cy.get(':nth-child(6) > a')
    cy.visit('http://localhost:4200/ventas/nuevo');

    cy.get('[formcontrolname="id_cliente"]').type('1');
    cy.get('[formcontrolname="id_vendedor"]').type('1');

    cy.get('.add-detail-button').click();

    cy.get('[formcontrolname="id_producto"]').type('1');
    cy.get('[formcontrolname="cantidad"]').type('1');
    cy.get('[formcontrolname="precio_unitario"]').type('1');

    cy.get('[type="submit"]').click();

  });
});