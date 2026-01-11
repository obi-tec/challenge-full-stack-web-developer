describe('template spec', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('.v-card-title', 'Bem-vindo ao painel administrativo!')
  })
})
