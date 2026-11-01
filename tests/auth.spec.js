const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

async function openEmailForm(page) {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
}

test("Успешная авторизация", async ({ page }) => {
  // Если появится капча, у вас есть 2 минуты, чтобы пройти её вручную
  test.setTimeout(150000);

  await openEmailForm(page);
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL(/netology\.ru\/profile/, { timeout: 120000 });
  await expect(page.getByRole("heading", { name: /Здравствуйте/ })).toBeVisible();
});

test("Неуспешная авторизация", async ({ page }) => {
  test.setTimeout(150000);

  await openEmailForm(page);
  await page.getByRole("textbox", { name: "Email" }).fill("wrong@example.com");
  await page.getByRole("textbox", { name: "Пароль" }).fill("wrongpassword");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.getByText("Вы ввели неправильно логин или пароль")).toBeVisible({ timeout: 120000 });
});
