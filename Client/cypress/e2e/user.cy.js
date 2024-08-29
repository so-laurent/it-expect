describe('User tests', () => {
  describe('Register', () => {

    const registerTests = [
      {title: 'Missing email', username: 'test', email: '', password: 'test$jdsfmlk1234!!', contains: 'Please enter a valid email address'},
      {title: 'Short username', username: 'te', email: 'test3@test.tst', password: 'test$jdsfmlk1234!!', contains: 'Username must be at least 3 characters long'},
      {title: 'Short password', username: 'test', email: 'test3@test.tst', password: 'test', contains: 'Password must be at least 8 characters long'},
      {title: 'User already exists', username: 'test', email: 'test2@test.tst', password: 'test$jdsfmlk1234!!', contains: 'Register failed - User already exist'},
      {title: 'Register successful', username: 'test', email: 'test3@test.tst', password: 'test$jdsfmlk1234!!', contains: '', url: '/login'}
    ]

    registerTests.forEach(test => {
      it(test.title, () => {
        cy.register(test.username, test.email, test.password)
        test.contains && cy.contains(test.contains).should('be.visible')
        test.url && cy.url().should('include', test.url)
      })
    })
  })

  describe('Login', () => {

    const loginTests = [
      {title: 'Missing email', email: '', password: 'test$jdsfmlk1234!!', contains: 'Please enter a valid email address'},
      {title: 'Invalid email', email: 'test3@tessdqfjlkt.qsdflksdjm', password: 'test$jdsfmlk1234!!', contains: 'Login Failed - User Not Found'},
      {title: 'Invalid password', email: 'test3@test.tst', password : '', contains: 'Login Failed - Password Incorrect'},
      {title: 'Login successful', email: 'test3@test.tst', password: 'test$jdsfmlk1234!!', contains: 'Bienvenue, test'}
    ]

    loginTests.forEach(test => {
      it(test.title, () => {
        cy.login(test.email, test.password)
        cy.contains(test.contains).should('be.visible')
      })
    })
  })

  describe('User operations', () => {

    beforeEach(() => {
      cy.login('test3@test.tst', 'test$jdsfmlk1234!!')
    })

    it('Update user', () => {
      cy.get('button').contains('Profil').click()
      cy.get('button[name="edit"]').click()
      cy.get('input[name="username"]').clear().type('test2')

      cy.get('button[type="submit"]').click()
      cy.contains('Bienvenue, test2').should('be.visible')
    })

    it('Logout user', () => {
      cy.get('button').contains('Deconnexion').click()
      cy.contains('Connexion').should('be.visible')
    })

    it('Delete user', () => {
      cy.get('button').contains('Profil').click()
      cy.get('button[name="delete"]').click()

      cy.login('test3@test.tst', 'test$jdsfmlk1234!!')
      cy.contains('Login Failed - User Not Found').should('be.visible')
    })
  })
})