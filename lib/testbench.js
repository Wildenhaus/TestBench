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
 * @class Benchmark
 * @memberof TestBench
 */
exports.Benchmark = require( './benchmark' );

/**
 * @public
 * @memberof TestBench
 */
exports.reporters = require( './reporters/' );

/**
 * @public
 * @class Runner
 * @memberof TestBench
 */
exports.Runner = require( './runner' );

/**
 * @public
 * @class Suite
 * @memberof TestBench
 */
exports.Suite = require( './suite' );

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