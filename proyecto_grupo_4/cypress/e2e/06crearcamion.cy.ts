describe('Login Flow', () => {
  it('Debería poder abrir la creación de productos y llenar el formulario', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/login');

    cy.get('#email').type('admin@quickduck.com');
    cy.get('#password').type('admin123');
    cy.get('.primary').click();

    cy.get(':nth-child(4) > a').click();
    cy.get('[routerlink="/camiones/nuevo"]').click();


    cy.get('[formcontrolname="placa"]').type('ABC1234');
    cy.get('[formcontrolname="capacidad"]').type('1000');
    cy.get('[formcontrolname="tipo"]').type('Refrigerado');
    cy.get('.ng-pristine').type('Bogotá-Medellin');

    cy.get('form.ng-dirty > button').click();
  });
});
