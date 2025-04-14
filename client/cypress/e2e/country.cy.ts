describe('CountryComponent E2E', () => {
  beforeEach(() => {
    cy.visit("/countries");
  });

  it('should load the table with countries', () => {
    cy.contains("Add countries").should("be.visible");
    
    cy.get('table').should('exist');
    cy.contains('USA').should('exist');
    cy.contains('China').should('exist');
  });

  it('should open the form dialog and add a new country', () => {
    cy.contains("Add countries").click();
   
    cy.get('input[name="name"]').type("Germany");
    cy.contains("Save").click();

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

    cy.contains('USA').should('not exist');
  });
})