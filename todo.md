# todo

## bootstrap

~~1. add commands to start, resume, or destroy devcontainer~~

1. continuous deploy frontend to logbook.cruftbusters.com
   a. [vite production build](https://vite.dev/guide/build.html)
1. convert todo to frontend page

## editor

The editor enables modifying logbooks, sheets, and transfers. Logbooks are collections of named sheets. Sheets are ordered lists of transfers. Transfers are dated movements of amounts from a credit account to a debit account. Amounts have an optional prefix and optional suffix.

1. create, rename, and delete logbooks
1. logbook local persistence
1. create, rename, and delete sheets
1. edit transfers
1. import delimited text to new sheet
1. transport logbook to and from text

## summarizer

The summarizer reduces a logbook to a statement of accounts. The most simple summary is the ending balance of each account. Advanced summaries show balance and deltas on recurring interval or filter for a subset of sheets and transfers or perform arithmetic between multiple subsummaries.

1. print balance sheet
1. filter by date (January 2025, this month, month to date, quarter to date, year to date)
1. timeseries balance and deltas (monthly, quarterly, yearly)
1. summary arithmetic

## evidence

Logbook is targeted at small business owners and guild operators. For tax or legal benefits it may be appropriate to attach evidence to each transfer. Evidence could be bank or credit card statements, invoices, notices, and more. Evidence could be plain text or a link to an attachment.
