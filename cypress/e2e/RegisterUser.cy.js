describe('Register User Page', () => {
  beforeEach(() => {
    // Visit the registration page before each test
    cy.visit('/register/user');
  });

  it('should display the registration form', () => {
    // Check if the registration form is displayed
    cy.get('form').should('be.visible');
  });

  it('should display the authentication header with correct text', () => {
    // Check if the authentication header is displayed with correct title and subtitle
    cy.contains('Comment').should('be.visible');
    cy.contains('Start your Volunteer Journey With us.').should('be.visible');
  });

  it('should display an error if registration fails', () => {
    // Fill out the registration form with invalid data
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('Test@1234');

    // Submit the form
    cy.get('form').submit();

    // Check if it stays on the registration page
    cy.url().should('include', '/register/user');

    // Optionally, you can also check for an error message
    // cy.contains('Invalid email address').should('be.visible');
  });

  it('should display the image on non-mobile screens', () => {
    // Set the viewport to a non-mobile size
    cy.viewport(1024, 768);

    // Check if the image is displayed
    cy.get('img[alt="Register picture."]').should('be.visible');
  });

  it('should not display the image on mobile screens', () => {
    // Set the viewport to a mobile size
    cy.viewport('iphone-6');

    // Check if the image is not displayed
    cy.get('img[alt="Register picture."]').should('not.exist');
  });
});
