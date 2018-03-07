import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | calculations', function(hooks) {
  setupApplicationTest(hooks);

  test('adding one and one', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#one');
    await click('button#add');
    await click('button#one');
    await click('button#equals')

    assert.equal(this.element.querySelector('#current-display').value, '2');
  });

  test('subtracting five from eleven', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#one');
    await click('button#one');
    await click('button#subtract');
    await click('button#five');
    await click('button#equals')

    assert.equal(this.element.querySelector('#current-display').value, '6');
  });

  test('multiplying and then dividing', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#two');
    await click('button#multiply');
    await click('button#nine');
    await click('button#divide');
    await click('button#three');
    await click('button#equals');

    assert.equal(this.element.querySelector('#current-display').value, '6');
  });

  test('exponentiation and square roots', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#five');
    await click('button#exponent');
    await click('button#two');
    await click('button#sqrt');
    await click('button#equals');

    assert.equal(this.element.querySelector('#current-display').value, '5');
  });

  test('working with decimals', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#five');
    await click('button#decimal');
    await click('button#two');
    await click('button#add');
    await click('button#five');
    await click('button#decimal');
    await click('button#two');
    await click('button#equals');

    assert.equal(this.element.querySelector('#current-display').value, '10.4');
  });

  test('surviving a page reload', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#five');
    await click('button#decimal');
    await click('button#two');
    await visit('/calculations');

    assert.equal(this.element.querySelector('#current-display').value, '5.2');
  });

  test('showing past calculations', async function(assert) {
    await visit('/calculations');
    await click('button#clear');

    await click('button#five');
    await click('button#decimal');
    await click('button#two');
    await click('button#add');
    await click('button#five');
    await click('button#decimal');
    await click('button#two');
    await click('button#equals');

    assert.equal(this.element.querySelector('.past-calculation').textContent, '(5.2) + 5.2 = 10.4');
  });

});
