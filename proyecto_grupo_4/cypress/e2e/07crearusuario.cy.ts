describe('Login Flow', () => {
  it('Debería poder abrir la creación de productos y llenar el formulario', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/login');

    cy.get('#email').type('admin@quickduck.com');
    cy.get('#password').type('admin123');
    cy.get('.primary').click();

    cy.get(':nth-child(5) > a')
    cy.visit('http://localhost:4200/parametros/nuevo');

    cy.get('[formcontrolname="nombre"]').type('Cristano Ronaldo');
    cy.get('[formcontrolname="descripcion"]').type('cristiano@quickduck.com');
    cy.get('[formcontrolname="Tipo"]').select("Administrador");

    cy.get('form.ng-dirty > button').click();
  });
});