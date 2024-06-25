describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('/login'); // Use relative URL
  });

  it('should display the login form', () => {
    cy.get('form').should('be.visible');
  });

  it('should display the authentication header', () => {
    cy.contains('Comment').should('be.visible');
    cy.contains('Volunteer Initiatives for a Cleaner Earth.').should(
      'be.visible'
    );
  });

  it('should stay on login page upon failed login', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`);
  });

  it('should display the login picture on non-mobile screens', () => {
    cy.viewport('macbook-15');
    cy.get('img[alt="Login picture."]').should('be.visible');
  });

  it('should not display the login picture on mobile screens', () => {
    cy.viewport('iphone-6');
    cy.get('img[alt="Login picture."]').should('not.exist');
  });
});
