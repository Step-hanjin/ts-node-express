describe('PaymonthComponent E2E', () => {
  beforeEach(() => {
    cy.visit("/paymonths");
  });

  it('should open the form dialog and add a new paymonth', () => {
    cy.contains("Add paymonth").click();
   
    cy.get('input[name="month"]').type("2025-03");
    cy.contains("Save").click();

    cy.contains('2025-03').should('exist');
  });

  it('should load the table with paymonths', () => {
    cy.contains("Add paymonth").should("be.visible");
    
    cy.get('table').should('exist');
    cy.contains('2025-05').should('exist');
  });

  it('should open edit form and update a paymonth', () => {
    cy.contains('Edit').first().click();

    cy.get('input[name="month"]').clear().type("2025-04");
    cy.contains('Save').click();

    cy.contains("2025-04").should('exist');
  });

  it('should delete a paymonth', () => {
    cy.contains('Delete').first().click();
    cy.contains('Yes').click();
    cy.get('table').should('not.contain', '2025-05');
  });
})