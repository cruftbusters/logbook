# todo

## devcontainer

~~1. add commands to start, resume, or destroy devcontainer~~

## continuous delivery

1. continuous deploy frontend to logbook.cruftbusters.com
   a. [vite production build](https://vite.dev/guide/build.html)
   b. [cloudflare vite plugin](https://developers.cloudflare.com/workers/vite-plugin/tutorial/)

## browser tests

1. ~~add playwright~~
1. ~~install playwright to devcontainer~~

```
✔ Install Playwright browsers (can be done manually via 'pnpm exec playwright install')? (Y/n) · true
✔ Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo pnpm exec playwright insta
```

1. <https://playwright.dev/docs/best-practices#use-chaining-and-filtering>

## local persistence

1. ~Logbook modifications are persisted beyond tab close and reopen~
1. If more than one tab is open then only one tab is active; the others are blocked from making changes

## navigator

1. ~~List, create, rename, and delete logbooks~~

## summarizer

The summarizer reduces a logbook to a statement of accounts. The most simple summary is the ending balance of each account. Advanced summaries show balance and deltas on recurring interval or filter for a subset of sheets and transfers or perform arithmetic between multiple subsummaries.

1. print balance sheet
1. filter by date (January 2025, this month, month to date, quarter to date, year to date)
1. timeseries balance and deltas (monthly, quarterly, yearly)
1. summary arithmetic

## editor

The editor enables modifying sheets. Logbooks are collections of named sheets. Sheets are ordered lists of transfers. Transfers are dated movements of amounts from a credit account to a debit account. Amounts have an optional prefix and optional suffix.

1. create, rename, and delete sheets
1. edit transfers
1. import delimited text to new sheet
1. transport logbook to and from text

## evidence

Logbook is targeted at small business owners and guild operators. For tax or legal benefits it may be appropriate to attach evidence to each transfer. Evidence could be bank or credit card statements, invoices, notices, and more. Evidence could be plain text or a link to an attachment.

## misc

1. convert markdowns to frontend pages
