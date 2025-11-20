import { test, expect } from '@playwright/test'

test('get started - create, rename, and delete two logbooks', async ({
  page,
}) => {
  await page.goto('http://vite.localhost:8080')

  const books = page.getByRole('listitem').filter({ hasText: 'new logbook' })

  await expect(books).not.toBeVisible()

  await page.getByRole('button', { name: 'create logbook' }).click()

  await expect(books).toBeVisible()

  await books.getByRole('button', { name: 'rename' }).click()

  await books.getByRole('textbox', { name: 'name' }).fill('oops typo')

  await books.getByRole('button', { name: 'discard' }).click()

  await expect(books).toBeVisible()

  await books.getByRole('button', { name: 'rename' }).click()

  await books.getByRole('textbox', { name: 'name' }).fill('books for biz')

  await books.getByRole('button', { name: 'accept' }).click()

  await expect(books).not.toBeVisible()

  const booksForBiz = page
    .getByRole('listitem')
    .filter({ hasText: 'books for biz' })

  await page.reload()

  await page.getByRole('button', { name: 'create logbook' }).click()

  await books.getByRole('button', { name: 'rename' }).click()

  await books.getByRole('textbox', { name: 'name' }).fill('books for personal')

  await books.getByRole('button', { name: 'accept' }).click()

  const booksForPersonal = page
    .getByRole('listitem')
    .filter({ hasText: 'books for personal' })

  await expect(books).not.toBeVisible()

  await expect(booksForBiz).toBeVisible()

  await expect(booksForPersonal).toBeVisible()

  await page.getByRole('button', { name: 'clear' }).click()

  await expect(booksForBiz).not.toBeVisible()

  await expect(booksForPersonal).not.toBeVisible()
})
