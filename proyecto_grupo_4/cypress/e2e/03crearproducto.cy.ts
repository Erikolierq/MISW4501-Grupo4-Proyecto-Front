describe('Login Flow', () => {
  it('Debería poder abrir la creación de productos y llenar el formulario', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4200/login');

    cy.get('#email').type('admin@quickduck.com');
    cy.get('#password').type('admin123');
    cy.get('.primary').click();

    // Ir a "Nuevo Producto"
    cy.get('[routerlink="/productos/nuevo"]').click();

    // Llenar formulario
    cy.get('[formcontrolname="nombre"]').type('Producto de prueba');
    cy.get('[formcontrolname="descripcion"]').type('Este es un producto de prueba automatizado.');
    cy.get('[formcontrolname="tipo"]').type('Electrónico');
    cy.get('[formcontrolname="cantidad"]').type('50');
    cy.get('[formcontrolname="ubicacion"]').type("Bogota");
    cy.get('[formcontrolname="fk_fabricante"]').type('2');
    cy.get('[formcontrolname="precio_unitario"]').type('199');

    // Enviar formulario
    cy.get('form.ng-dirty > button').click();
    cy.wait(1500);
  });
});
