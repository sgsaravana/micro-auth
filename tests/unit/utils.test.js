'use strict'

import utils from '../../lib/utils';

describe('Test Utils function', () => {

  test('convert camelCase to snake_case', () => {
    expect(utils.toSnakeCase('testThisText')).toBe('test_this_text');
  });

  test('convert snake_case to camelCase', () => {
    expect(utils.toCamelCase('this_should_become_camel')).toBe('thisShouldBecomeCamel');
  });

});