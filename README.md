# Автотесты авторизации на netology.ru (Playwright)

## Установка

    npm install
    npx playwright install chromium

## Подготовка данных

Создайте в корне проекта файл `user.js`. Он указан в `.gitignore` и не попадает в репозиторий, поэтому логин и пароль остаются только у вас:

    module.exports = {
      email: "ваш_email",
      password: "ваш_пароль",
    };

## Запуск

    npx playwright test --headed

## Примечание

При входе сайт может показать Yandex SmartCaptcha. Её нужно пройти вручную в окне браузера, тест подождёт до 2 минут.
