describe('Проверка авторизации', function () {

  beforeEach('Начало теста', function () {
    cy.visit('/');
    cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
  });

  afterEach('Конец теста', function () {
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('Верный пароль и верный логин', function () {
    cy.get('#mail').type('german@dolnikov.ru');
    cy.get('#pass').type('iLoveqastudio1');
    cy.get('#loginButton').click();
    cy.get('#messageHeader').should('be.visible');
    cy.get('#messageHeader').contains('Авторизация прошла успешно');
  });

  it('Верный логин и неверный пароль', function () {
    cy.get('#mail').type('german@dolnikov.ru');
    cy.get('#pass').type('iLoveqastudio2');
    cy.get('#loginButton').click();
    cy.get('#messageHeader').should('be.visible');
    cy.get('#messageHeader').contains('Такого логина или пароля нет');
  });

  it('Валидация на наличие @', function () {
    cy.get('#mail').type('germandolnikov.ru');
    cy.get('#pass').type('iLoveqastudio');
    cy.get('#loginButton').click();
    cy.get('#messageHeader').should('be.visible');
    cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
  });

  it('Восстановление пароля', function () {
    cy.get('#forgotEmailButton').click();
    cy.get('#mailForgot').type('german@dolnikov.ru');
    cy.get('#restoreEmailButton').click();
    cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
  });

  it('Верный пароль и неверный логин', function () {
    cy.get('#mail').type('shokokoko@yandex.ru');
    cy.get('#pass').type('iLoveqastudio1');
    cy.get('#loginButton').click();
    cy.get('#messageHeader').should('be.visible');
    cy.get('#messageHeader').contains('Такого логина или пароля нет');
  });

 it('Верный пароль и влияние регистра на логин', function () {
    console.log('Шаг 1: Заполнение поля email');
    cy.get('#mail').type('german@dolnikov.ru');
    
    console.log('Шаг 2: Заполнение поля пароля');
    cy.get('#pass').type('iLoveqastudio1');
    
    console.log('Шаг 3: Нажатие на кнопку Вход');
    cy.get('#loginButton').click();
    
    console.log('Шаг 4: Ожидание появления сообщения');
    cy.get('#messageHeader').should('be.visible');
    
    console.log('Шаг 5: Проверка содержания сообщения');
    cy.contains('#messageHeader', 'Авторизация прошла успешно');
});
})

