describe('CountryComponent E2E', () => {
  beforeEach(() => {
    cy.visit("/countries");
  });

  it('should open the form dialog and add a new country', () => {
    cy.contains("Add country").click();
   
    cy.get('input[name="name"]').type("Germany");
    cy.contains("Save").click();

    cy.contains('Germany').should('exist');
  });

  it('should load the table with countries', () => {
    cy.contains("Add country").should("be.visible");
    
    cy.get('table').should('exist');
    cy.contains('Germany').should('exist');
  });

  it('should open edit form and update a country', () => {
    cy.contains('Edit').first().click();

    cy.get('input[name="name"]').clear().type("United States");
    cy.contains('Save').click();

    cy.contains("United States").should('exist');
  });

  it('should delete a country', () => {
    cy.contains('Delete').first().click();
    cy.contains('Yes').click();
    cy.get('table').should('not.contain', 'United States');
  });
})