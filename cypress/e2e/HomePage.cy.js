describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the background image', () => {
    cy.get('img[alt="Background"]').should('be.visible');
  });

  it('should display the volunteer program title and description', () => {
    cy.contains('Program Volunteer').should('be.visible');
    cy.contains(
      'Bergabunglah dengan gerakan global untuk menjaga bumi kita! Anda dapat berkontribusi dalam berbagai program lingkungan, menemukan kegiatan di sekitar Anda, dan membuat dampak nyata.',
    ).should('be.visible');
  });
});
