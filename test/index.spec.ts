import 'mocha';
import {expect} from 'chai';
import {add} from '../src';

describe('Add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).to.equal(3);
  });

  it('should add two numbers', () => {
    expect(add(-1, 2)).to.equal(1);
  });
});