// Игнорируем некритичные ошибки (например, от Webpack Dev Server), чтобы Cypress не прерывал тест
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Тестирование конструктора бургеров', () => {
  
  beforeEach(() => {
    // 1. Перехватываем запросы к API
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    // 2. Устанавливаем фейковые токены авторизации
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    // 3. Загружаем страницу
    cy.visit('/');
    
    // 4. Ожидаем завершения сетевых запросов
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    // 5. ВАЖНО: Даем React время (1 секунду) на обновление Redux-стейта пользователя
    cy.wait(1000); 
  });

  afterEach(() => {
    // Очищаем токены после каждого теста согласно чек-листу
    window.localStorage.clear();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку и начинку в конструктор', () => {
      // Ищем карточку с булкой и кликаем по кнопке "Добавить" внутри неё
      cy.contains('[data-cy="ingredient-item"]', 'Краторная булка')
        .find('button')
        .click({ force: true });
      
      // Ищем карточку с начинкой и кликаем по кнопке "Добавить"
      cy.contains('[data-cy="ingredient-item"]', 'Филе Люминесцентного')
        .find('button')
        .click({ force: true });

      // Проверяем, что добавленные ингредиенты появились в блоке конструктора
      cy.get('[data-cy="constructor"]').contains('Краторная булка').should('exist');
      cy.get('[data-cy="constructor"]').contains('Филе Люминесцентного').should('exist');
    });
  });

 describe('Работа модального окна ингредиента', () => {
    it('должно открываться модальное окно с описанием нужного ингредиента', () => {
      // Ищем элемент И ВНУТРИ НЕГО ищем текст, чтобы кликнуть точно по ссылке
      cy.get('[data-cy="ingredient-item"]').contains('Филе Люминесцентного').click({ force: true });

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').contains('Филе Люминесцентного').should('exist');
    });

    it('должно закрываться по клику на крестик', () => {
      cy.get('[data-cy="ingredient-item"]').contains('Филе Люминесцентного').click({ force: true });
      
      cy.get('[data-cy="modal-close"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('должно закрываться по клику на оверлей', () => {
      cy.get('[data-cy="ingredient-item"]').contains('Филе Люминесцентного').click({ force: true });
      
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Процесс создания заказа', () => {
    it('должен собирать бургер, оформлять заказ и очищать конструктор', () => {
      // 1. Нажимаем на кнопки "Добавить"
      cy.contains('[data-cy="ingredient-item"]', 'Краторная булка').find('button').click({ force: true });
      cy.contains('[data-cy="ingredient-item"]', 'Филе Люминесцентного').find('button').click({ force: true });

      // ВАЖНО: Ждем, пока React обновит DOM и добавит ингредиенты в конструктор
      cy.get('[data-cy="constructor"]').contains('Краторная булка').should('exist');
      cy.get('[data-cy="constructor"]').contains('Филе Люминесцентного').should('exist');

      // 2. Теперь булка точно в стейте, кликаем «Оформить заказ»
      cy.get('[data-cy="order-button"]').find('button').click({ force: true });
      
      // 3. Запрос теперь 100% отправится, дожидаемся его
      cy.wait('@createOrder');

      // 4. Проверяем окно заказа
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').contains('12345').should('exist');

      // 5. Закрываем окно заказа
      cy.get('[data-cy="modal-close"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');

      // 6. Проверяем очистку
      cy.get('[data-cy="constructor"]').contains('Выберите булки').should('exist');
    });
  });
});
