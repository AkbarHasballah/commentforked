describe('Register Company Page', () => {
  beforeEach(() => {
    cy.visit('/register/company'); // Ensure your local dev server is running at the baseUrl
  });

  it('should display the registration form', () => {
    cy.get('form').should('be.visible');
  });

  it('should show an error on registration failure', () => {
    // Simulate a registration failure by submitting the form with invalid data or a duplicate user
    cy.get('input[name="username"]').type('existinguser');
    cy.get('input[name="email"]').type('existinguser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    // Verify that the user is redirected back to the registration page on failure
    cy.url().should('include', '/register/company');
  });

  it('should display the authentication header correctly', () => {
    cy.contains('Comment').should('be.visible');
    cy.contains('Open your Journey and Start With us.').should('be.visible');
  });
});
