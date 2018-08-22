'use strict';
/**
 * @module Benchmark
 */

/* NodeJS */
if ( typeof module !== 'undefined' && module.exports ) {
  /* Expose performance class for NodeJS ( >= v8.5.0 ) */
  global.performance = require( 'perf_hooks' ).performance;

  /* Expose Benchmark class */
  module.exports = Benchmark;
}

/* Constants */
const WARMUP_MAX_ITERATIONS = 1e6;       // Maximum iterations for warmup
const WARMUP_STOP_ACCELERATION = 1e2;    // Acceleration value to stop warmup at
const WARMUP_STOP_CHECK_FREQUENCY = 1e3; // How often to check for warmup stop conditions

/**
 * Initialize a new Benchmark
 * @param {String} name           Name
 * @param {Number} iterations     Iteration Count
 * @param {Boolean} warmupEnabled Warmup
 * @param {Function} func         Benchmark Function
 * @return {BenchmarkResult}      Benchmark Results
 */
function Benchmark( name, iterations, warmup, func ) {

  if ( typeof warmup === 'function' ) {
    func = warmup;
    warmup = true;
  }

  if ( typeof name !== 'string' )
    throw 'Name shoud be a string but type ' + typeof name + ' was given.';
  if ( typeof iterations !== 'number' )
    throw 'Iterations should be a number but type ' + typeof iterations + ' was given.';
  if ( typeof warmup !== 'boolean' )
    throw 'Warmup should be a boolean but type ' + typeof warmup + ' was given.';
  if ( typeof func !== 'function' )
    throw 'BenchmarkFunction should be a function but type ' + typeof func + ' was given.';

  this.name = name;
  this.iterations = iterations;
  this._warmup = warmup;
  this._func = func;

}

/**
 * @typedef {Object} BenchmarkResult
 * @property {Number} iterations      Number of iterations the warmup session executed
 * @property {Number} total           The total execution time of the warmup session
 */

/**
 * Runs the benchmark
 * @return {BenchmarkResult} Benchmark Result
 */
Benchmark.prototype.run = function () {

  var benchmarkResults = {
    name: this.name,
    iterations: this.iterations
  };

  if ( this._warmup === true )
    benchmarkResults.warmup = this._runWarmup();

  var sum = 0, i = this.iterations;
  while ( i-- ) {
    var start = performance.now();
    this._func();
    var end = performance.now();

    sum += ( end - start ) * 1e6;
  }

  benchmarkResults.average = sum / this.iterations;
  benchmarkResults.total = sum;

  return benchmarkResults;

};

/**
 * @typedef {Object} WarmupDetails
 * @property {String} name            Name of the benchmark
 * @property {Number} iterations      Number of iterations the benchmark executed
 * @property {Number} average         The average execution time of the benchmark
 * @property {Number} total           The total execution time of the benchmark
 * @property {WarmupDetails} [warmup] Warmup Details
 */

/**
 * Warms up by running the benchmark function until performance
 * optimization hits a plateau (most prevalent in V8 environments)
 * @private
 * @return {Object} Warmup Details
 */
Benchmark.prototype._runWarmup = function () {
  var i = 0, sum = 0, warmup = true;
  var previous = null;

  while ( warmup ) {
    var start = performance.now();
    this._func();
    var end = performance.now();

    sum += ( end - start ) * 1e6;

    if ( ++i % WARMUP_STOP_CHECK_FREQUENCY === 0 ) {
      var perf = { Iteration: i, Total: sum };

      if ( previous )
        perf.Velocity = perf.Total - previous.Total;
      if ( previous && previous.Velocity )
        perf.Acceleration = Math.abs( perf.Velocity - previous.Velocity );

      previous = perf;
      if ( perf.Acceleration < WARMUP_MAX_ITERATIONS
        || i > WARMUP_STOP_ACCELERATION )
        warmup = false;
    }
  }

  return {
    iterations: i,
    total: sum
  };
};