# todo

## devcontainer

~~1. add commands to start, resume, or destroy devcontainer~~

## browser tests

1. ~~add playwright~~
1. ~~install playwright to devcontainer~~

```
✔ Install Playwright browsers (can be done manually via 'pnpm exec playwright install')? (Y/n) · true
✔ Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo pnpm exec playwright insta
```

1. <https://playwright.dev/docs/best-practices#use-chaining-and-filtering>

## wireframe

1. ~~List, create, rename, and delete logbooks~~
2. rename logbook to logbooks
3. move status to footer

## summary

1. reduce a logbook's transfers to statement of account balances
1. filter transfers by date (January 2025, this month, month to date, quarter to date, year to date)
1. filter transfers by sheet
1. daily, weekly, monthly, quarterly, and yearly breakdowns

## summary books

1. named summary books store multiple editable summaries

## editor

The editor enables modifying sheets. Logbooks are collections of named sheets. Sheets are ordered lists of transfers. Transfers are dated movements of amounts from a credit account to a debit account. Amounts have an optional prefix and optional suffix.

1. create, rename, and delete sheets
1. edit transfers
1. import delimited text to new sheet
1. transport logbook to and from text

## local persistence

1. ~Logbook modifications are persisted beyond tab close and reopen~
1. If more than one tab is open then only one tab is active; the others are blocked from making changes
1. if more than one tab is open then changes are propagated between tabs

## deploy

1. when push to trunk then package and deploy frontend to logbooks.cruftbusters.com
   a. [vite production build](https://vite.dev/guide/build.html)
   b. [cloudflare vite plugin](https://developers.cloudflare.com/workers/vite-plugin/tutorial/)

## evidence

Logbook is targeted at small business owners and guild operators. Enabling attachment of evidence to transfers provides finance and legal observability. Evidence could be bank or credit card statements, invoices, notices, and more. Evidence could be plain text or a link to an attachment.
