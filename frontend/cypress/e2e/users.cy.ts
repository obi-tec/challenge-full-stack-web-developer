import { v4 as uuidv4 } from 'uuid'

describe('User List Page', () => {
  beforeEach(() => {
    cy.visit('/users')
  })

  const baseUuid = uuidv4()
  const baseEmail = `testuser${Math.floor(Math.random() * 10000)}@example.com`

  // Scenario: Register a new user
  it('should open the user registration modal', () => {
    cy.get('.v-btn__content').contains('Cadastrar').click()

    cy.get('[data-cy=user-modal]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')
  })

  // Scenario: Save valid user data
  it('should display required fields in modal and save data', () => {
    const name = `Test User ${Math.floor(Math.random() * 10000)}`

    cy.get('.v-btn__content').contains('Cadastrar').click()

    cy.get('[data-cy=user-modal]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-input-name"]').should('have.value', '')
    cy.get('[data-cy="user-input-email"]').should('have.value', '')

    cy.get('[data-cy="user-input-name"]').type(name)
    cy.get('[data-cy="user-input-email"]').type(baseEmail)

    cy.get('[data-cy="user-input-uuid"]').clear().type(baseUuid)

    cy.get('[data-cy="user-modal-btn-salvar"]').contains('Salvar').click()

    cy.get('.v-snackbar--active').should('exist').and('contain.text', 'Usuário criado com sucesso!')
  })

  // Scenario: Validate duplicate UUID
  it('should display UUID duplicate', () => {
    const name = `Test User ${Math.floor(Math.random() * 10000)}`
    const email = `testuser${Math.floor(Math.random() * 10000)}@example.com`

    cy.get('.v-btn__content').contains('Cadastrar').click()

    cy.get('[data-cy=user-modal]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-input-name"]').should('have.value', '')
    cy.get('[data-cy="user-input-email"]').should('have.value', '')

    cy.get('[data-cy="user-input-name"]').type(name)
    cy.get('[data-cy="user-input-email"]').type(email)

    cy.get('[data-cy="user-input-uuid"]').clear().type(baseUuid)

    cy.get('[data-cy="user-modal-btn-salvar"]').contains('Salvar').click()

    cy.get('.v-snackbar--active').should('exist').and('contain.text', 'UUID already exists')
  })

  // Scenario: Validate duplicate email
  it('should display email duplicate', () => {
    const name = `Test User ${Math.floor(Math.random() * 10000)}`

    cy.get('.v-btn__content').contains('Cadastrar').click()

    cy.get('[data-cy=user-modal]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-input-name"]').should('have.value', '')
    cy.get('[data-cy="user-input-email"]').should('have.value', '')

    cy.get('[data-cy="user-input-name"]').type(name)
    cy.get('[data-cy="user-input-email"]').type(baseEmail)

    cy.get('[data-cy="user-input-uuid"]').clear().type(uuidv4())

    cy.get('[data-cy="user-modal-btn-salvar"]').contains('Salvar').click()

    cy.get('.v-snackbar--active').should('exist').and('contain.text', 'Email already exists')
  })

  // Scenario: Cancel register a new user
  it('should cancel user registration modal', () => {
    cy.get('.v-btn__content').contains('Cadastrar').click()

    cy.get('[data-cy=user-modal]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-modal-btn-cancel"]').contains('Cancelar').click()
    cy.get('[data-cy=user-modal]').should('not.exist')
  })

  // Scenario: List registered users
  it('should display the "Cadastrar" button', () => {
    cy.get('.v-btn__content').contains('Cadastrar').should('exist')
  })

  it('should display a list of users', () => {
    cy.get('[data-cy=user-list]').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should display "UUID", "Nome", "E-mail", "Editar" and "Excluir" buttons for each user if users are listed', () => {
    cy.get('[data-cy=user-list]').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)

    cy.wait(1500)
    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('[data-cy=user-item-uuid]').should('exist')
        cy.get('[data-cy=user-item-name]').should('exist')
        cy.get('[data-cy=user-item-email]').should('exist')
        cy.get('[data-cy=edit-button]').should('exist')
        cy.get('[data-cy=delete-button]').should('exist')
      })
    })
  })

  // Scenario: Edit user registration
  it('should open the edit screen and display pre-filled user fields with editable name and email', () => {
    cy.get('[data-cy="edit-button"]').first().click()

    cy.get('[data-cy="user-modal"]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-input-name"]').should('not.be.empty')
    cy.get('[data-cy="user-input-email"]').should('not.be.empty')
    cy.get('[data-cy="user-input-uuid"]').should('not.be.empty')

    cy.get('[data-cy="user-input-name"]').should('not.be.disabled')
    cy.get('[data-cy="user-input-email"]').should('not.be.disabled')
    cy.get('[data-cy="user-input-uuid"]').should('not.be.enabled')
  })

  //Scenario: Save edited user data
  it('should edit user', () => {
    const name = `Test User ${Math.floor(Math.random() * 10000)}`
    const email = `test${Math.floor(Math.random() * 10000)}@example.com`
    cy.get('[data-cy="edit-button"]').first().click()

    cy.get('[data-cy="user-modal"]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-input-name"]').should('not.be.empty')
    cy.get('[data-cy="user-input-email"]').should('not.be.empty')
    cy.get('[data-cy="user-input-uuid"]').should('not.be.empty')

    cy.get('[data-cy="user-input-name"]').clear().type(name)
    cy.get('[data-cy="user-input-email"]').clear().type(email)

    cy.get('[data-cy="user-modal-btn-salvar"]').contains('Salvar').click()
    cy.get('.v-snackbar--active')
      .should('exist')
      .and('contain.text', 'Usuário atualizado com sucesso!')
  })

  // Scenario: Cancel edit a new user
  it('should cancel user edit modal', () => {
    cy.get('.v-btn__content').contains('Cadastrar').click()

    cy.get('[data-cy=user-modal]').should('be.visible')

    cy.get('[data-cy="user-input-name"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-email"]').should('exist').and('be.visible')
    cy.get('[data-cy="user-input-uuid"]').should('exist').and('be.visible')

    cy.get('[data-cy="user-modal-btn-cancel"]').contains('Cancelar').click()
    cy.get('[data-cy=user-modal]').should('not.exist')
  })

  // Delete user registration
  it('should display confirmation modal when clicking Excluir', () => {
    cy.get('[data-cy="delete-button"]').first().click()
    cy.get('[data-cy="delete-user-modal"]').should('be.visible')
    cy.get('[data-cy="delete-user-modal"]').should('contain.text', 'Excluir Usuário')
    cy.get('[data-cy="delete-user-modal"]').should(
      'contain.text',
      'Você tem certeza que deseja excluir o usuário',
    )
    cy.get('[data-cy="delete-user-modal"] .v-btn').contains('Cancelar').should('be.visible')
    cy.get('[data-cy="delete-user-modal"] .v-btn').contains('Excluir').should('be.visible')
  })

  // Scenario: Cancel user deletion
  it('should cancel user delete modal', () => {
    cy.get('[data-cy="delete-button"]').first().click()
    cy.get('[data-cy=delete-user-modal]').should('be.visible')

    cy.get('[data-cy="user-modal-btn-cancel"]').contains('Cancelar').click()
    cy.get('[data-cy=delete-user-modal]').should('not.exist')
  })

  // Scenario: Confirm user deletion
  it('should delete the user when clicking Confirmar in the confirmation modal', () => {
    cy.get('[data-cy="delete-button"]').first().click()
    cy.get('[data-cy="delete-user-modal"]').should('be.visible')

    cy.get('[data-cy="user-name"]')
      .first()
      .then((userName) => {
        const nameBeforeDeletion = userName.text()

        cy.get('[data-cy="delete-user-modal"] .v-btn').contains('Excluir').click()

        cy.get('[data-cy="user-name"]').first().should('not.contain.text', nameBeforeDeletion)

        cy.get('[data-cy="delete-user-modal"]').should('not.exist')
      })
  })
})
