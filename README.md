# Calculator Challenge

## Requirements

You are to build a browser based calculator with the following requirements:

* The calculator must support at least the following operations: +, -, \*(multiplication), /, \*\*(exponentiation), sqrt.
* Calculations may be performed on the server (preferred ruby on rails) or the client side.  However, no reloading of the page is allowed.
* The calculator must store the last 10 calculations performed by the user.  The list of calculations must survive a refresh but not necessarily a cookie clear.  The list should be tied to the browser that performed the calculation.  In other words, if a user performs a calculation on Browser A, and then performs a calculation on Browser B, when the app is accessed from Browser A only calculations performed from Browser A should appear and vice versa.

### Acceptance Tests

Acceptance tests have been written against these requirements at `/tests/acceptance`.

* `ember test`
* `ember test --server`

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git@github.com:andyweiss1982/ember-calculator.git`
* `cd calculator`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).
