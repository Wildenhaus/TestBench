'use strict';
/**
 * @module Reporter
 */

/* Dependencies */
const ora = require( 'ora' );

/* Expose Reporter class */
exports = module.exports = Reporter;

function Reporter( runner ) {
  if ( !runner ) return;
  this.runner = runner;

  var stats = this.stats = {
    suites: 0,
    benchmarks: 0,
    increases: 0,
    netIncrease: 0.0,
    decreases: 0,
    netDecrease: 0.0,
    netChange: 0.0
  };

  runner.on( 'benchmarkEnd', this.onBenchmarkEnd.bind( this ) );
  runner.on( 'benchmarkStart', this.onBenchmarkStart.bind( this ) );
  runner.on( 'end', this.onEnd.bind( this ) );
  runner.on( 'start', this.onStart.bind( this ) );
  runner.on( 'suite', this.onSuite.bind( this ) );
};

Reporter.prototype.onBenchmarkEnd = function ( benchmark ) {
  this.stats.benchmarks = this.stats.benchmarks || 0;
  this.stats.benchmarks++;
}

Reporter.prototype.onBenchmarkStart = function ( benchmark ) {
  //this.stats.suites = this.stats.suites || 0;
  //suite.root || this.stats.suites++;
}

Reporter.prototype.onEnd = function () {
  this.end = new Date();
  this.duration = this.end - this.start;
  this.printSummary();
}

Reporter.prototype.onStart = function () {
  this.stats.start = new Date();
}

Reporter.prototype.onSuite = function ( suite ) {
  this.stats.suites = this.stats.suites || 0;
  suite.root || this.stats.suites++;
}

Reporter.prototype.printSummary = function () {

  var stats = this.stats;
  var fmt;

  console.log();

  /* Performance Increases */
  console.log( '%d performance increases (%d)', stats.increases || 0, stats.netIncreases || 0.0 );

  /* Performance Decreases */
  console.log( '%d performance decreases (%d)', stats.decreases || 0, stats.netDecreases || 0.0 );

};