describe('New User Flow', () => {
    it('Debería registrar un nuevo usuario e iniciar sesión con él', () => {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:4200/login');
  
      cy.get('.secondary').click();
  
      const email = `prueba_${Date.now()}@quickduck.com`; // ← Email dinámico
  
      cy.get('#email').type(email);
      cy.get('#nombre').type('Country General Manager');
      cy.get('#password').type('admin123');
      cy.get('#rol').select('VENDEDOR');
      cy.get('.btn').click();
  
      cy.screenshot('registro_nuevo_usuario');

      cy.get('#email').type(email);
      cy.get('#password').type('admin123');
      cy.get('.primary').click();
  
      cy.screenshot('inicio_sesion_nuevo_usuario');
    });
  });
  