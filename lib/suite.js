'use strict';
/**
 * @module Suite
 */

/* Expose Suite class */
exports = module.exports = Suite;

function Suite( name, context ) {
  if ( typeof name === 'function' ) {
    context = name;
    name = null;
  }
  else if ( typeof name !== 'string ' )
    throw 'Name should be a string but type ' + typeof name + ' was given.';

  this.name = name;
  this.context = context;
  this.suites = [];
  this.benchmarks = [];
  this._root = !name;
};

Suite.prototype = {};