# public-APIs-app

### This application allows you to view list of public APIs, filter and search through them using [Public API for Public APIs](https://github.com/davemachado/public-api).

## Features

1. List all APIs divided into sections by categories
2. Get a random API
3. Filter APIs by category
4. Filter APIs by auth type (no auth/apiKey/OAuth)
5. Search through APIs by keyword (name & description)

### This app was done during the [Kottans frontend course](https://kottans.org)

## Development

Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine.

`npm install` to install dependencies.
Ignore npm audit warnings.
If any changes appear on `package-lock.json` just commit those.

`npm start` to launch dev server, app would be served at http://localhost:1234/

`npm run lint` to lint and prettify your code

The project implements a pre-commit hook that launches staged files linting.
If your IDE reports a commit failure then run `npm run lint` and/or `npm run lint:staged`
and fix reported issues. Note that [`.eslintrc.js`](./.eslintrc.js) allows
`console.error` and `console.warn`.

`npm run build` to build production distribution package

`npm run deploy` to publish built app
