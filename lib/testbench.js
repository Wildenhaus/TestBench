'use strict';

/*!
 * testbench
 * Copyright(c) 2018 Reid Wildenhaus <reid@wilden.haus>
 * Licensed under GNU GPL 3.0
 */

/**
 * @module TestBench
 */
exports = module.exports = TestBench;

/**
 * @public
 * @class benchmark
 * @memberof TestBench
 */
exports.Benchmark = require( './benchmark' );

/**
 * @typedef {Object} TestBenchOptions
 * @property {string} statsFile Filename to persist stats to
 */

/**
 * Set up TestBench
 * @param {TestBenchOptions} options
 */
function TestBench( options ) {
  options = options || {};
  this.options = options;
}

TestBench.prototype = {};