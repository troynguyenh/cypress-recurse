// @ts-check
/// <reference types="cypress" />
import { recurse, RecurseDefaults } from '../..'

it('gets 7', () => {
  recurse(
    () => cy.wrap(7),
    (n) => n === 7,
  )
})

// there is a chance that this function fails, so allow retrying it
it('gets 7 after 50 iterations or 30 seconds', { retries: 2 }, () => {
  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
    {
      limit: 50, // max number of iterations
      timeout: 30000, // time limit in ms
    },
  )
})

it('has default options', () => {
  expect(RecurseDefaults).to.have.keys(['limit', 'timeout', 'log'])
})

// it('checks invalid option via types', () => {
//   recurse(
//     () => cy.task('randomNumber'),
//     (n) => n === 7,
//     {
//       limit: 10,
//       unknownOptions: 42,
//     },
//   )
// })
