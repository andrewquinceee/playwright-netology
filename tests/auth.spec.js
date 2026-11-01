const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

const shot = (page, name, options = {}) =>
  page.screenshot({ path: `screenshots/${name}.png`, ...options });

async function openEmailForm(page, prefix) {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Другие способы входа").waitFor();
  await shot(page, `${prefix}-1-login-page`);

  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).waitFor();
  await shot(page, `${prefix}-2-email-form`);
}

test("Успешная авторизация", async ({ page }) => {
  // Если появится капча, есть 2 минуты, чтобы пройти её вручную
  test.setTimeout(150000);

  await openEmailForm(page, "success");

  const emailField = page.getByRole("textbox", { name: "Email" });
  const passwordField = page.getByRole("textbox", { name: "Пароль" });
  await emailField.fill(email);
  await passwordField.fill(password);
  // Поля с настоящими данными закрашиваются на снимке
  await shot(page, "success-3-filled", { mask: [emailField, passwordField] });

  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL(/netology\.ru\/profile/, { timeout: 120000 });
  await expect(page.getByRole("heading", { name: /Здравствуйте/ })).toBeVisible();
  await shot(page, "success-4-profile");
});

test("Неуспешная авторизация", async ({ page }) => {
  test.setTimeout(150000);

  await openEmailForm(page, "fail");

  await page.getByRole("textbox", { name: "Email" }).fill("wrong@example.com");
  await page.getByRole("textbox", { name: "Пароль" }).fill("wrongpassword");
  await shot(page, "fail-3-filled");

  await page.getByTestId("login-submit-btn").click();

  await expect(
    page.getByText("Вы ввели неправильно логин или пароль")
  ).toBeVisible({ timeout: 120000 });
  await shot(page, "fail-4-error");
});
