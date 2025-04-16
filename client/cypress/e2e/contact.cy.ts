describe('ContactComponent E2E', () => {
  beforeEach(() => {
    cy.visit("/contacts");
  });

  it('should open the form dialog and add a new contact', () => {
    cy.contains("Add contact").should("be.visible");
    cy.contains("Add contact").click();

    // Fill the input field
    cy.get('input[name="name"]').type("Johe Doe");
    cy.get('input[name="email"]').type("johedoe@gmail.com");
    cy.get('input[name="phone"]').type("333 9923 239239");
    cy.get('input[name="note"]').type("test note");

    // Select from the dropdown
    cy.get('[id="country"]').parent().click();
    cy.get('[id="country"]').click({ force: true }); // forces the click    

    cy.contains('li', 'Germany').click();

    cy.contains("Save").click();
    cy.contains('Germany').should('exist');
    cy.contains('Johe Doe').should('exist');
  });

  it('should load the table with contacts', () => {
    cy.get('table').should('exist');
    cy.contains('Germany').should('exist');
  });


  it('should open edit form and update a contact', () => {
    cy.contains('Edit').first().click();

    cy.get('[id="country"]').parent().click();
    cy.get('[id="country"]').click({ force: true }); // forces the click    

    cy.contains('li', 'USA').click();
    
    cy.contains('Save').click();

    cy.contains("USA").should('exist');
  });

  it('should delete a contact', () => {
    cy.contains('Delete').first().click();
    cy.contains('Yes').click();
    cy.get('table').should('not.contain', 'Germany');
  });
})