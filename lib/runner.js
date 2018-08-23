'use strict';
/**
 * @module Runner
 */

/* Dependencies */
const EventEmitter = require( 'events' ).EventEmitter;
const inherits = require( './utils' ).inherits;

/* Expose Runner class */
exports = module.exports = Runner;

function Runner( suite ) {
  this.suite = suite;
};
inherits( Runner, EventEmitter );

Runner.prototype.runBenchmark = function ( benchmark ) {
  var self = this;

  self.emit( 'benchmarkStart', benchmark );

  var result = benchmark.run();

  self.emit( 'benchmarkEnd', benchmark );
}

Runner.prototype.runBenchmarks = function ( suite ) {
  var self = this;
  var benchmarks = suite.benchmarks.slice();
  var benchmark;

  function next() {
    benchmark = benchmarks.shift();

    if ( !benchmark ) {
      self.emit( 'end' );
      return;
    }

    self.runBenchmark( benchmark );
    return next();
  }

  this.next = next;
  self.emit( 'start' );
  next();
};