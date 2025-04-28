describe('Login Flow', () => {
    it('Debería poder navegar dentro de la app', () => {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:4200/login');
  
      cy.get('#email').type('admin@quickduck.com');
      cy.get('#password').type('admin123');
      cy.get('.primary').click();


      cy.get('.active')
      cy.get(':nth-child(3) > a').click();
      cy.wait(1500);
      cy.get(':nth-child(4) > a').click();
      cy.wait(1500);
      cy.get(':nth-child(5) > a').click();
      cy.wait(1500);
      cy.get(':nth-child(6) > a').click();
      cy.wait(1500);
      cy.get(':nth-child(7) > a')
      cy.wait(1500);
    });
  });
  