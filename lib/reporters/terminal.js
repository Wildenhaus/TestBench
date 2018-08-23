'use strict';
/**
 * @module Terminal
 */

/* Dependencies */
const Base = require( './base' );
const inherits = require( '../utils' ).inherits;
const ora = require( 'ora' );

/* Expose TerminalReporter class */
exports = module.exports = Terminal;

/* Default Reporter colors */
exports.colors = {
  increase: 32,
  decrease: 31,
  success: 32
};
var color = ( exports.color = function ( type, str ) {
  return '\u001b[' + exports.colors[ type ] + 'm' + str + '\u001b[0m';
} );

/* Default Reporter symbols */
exports.symbols = {
  faster: '▲',
  slower: '▼'
};

function Terminal( runner ) {
  Base.call( this, runner );
}
inherits( Terminal, Base );

Terminal.prototype.onBenchmarkEnd = function ( benchmark ) {
  Base.prototype.onBenchmarkEnd.call( this, benchmark );
  const symbol = color( 'success', '✔' );
  this._spinner.stopAndPersist( { symbol } );
}

Terminal.prototype.onBenchmarkStart = function ( benchmark ) {
  Base.prototype.onBenchmarkStart.call( this, benchmark );
  this._spinner = ora( { color: 'gray' } ).start( benchmark.name );
}

Terminal.prototype.printSummary = function () {

  var stats = this.stats;
  var fmt;

  console.log();

  /* Performance Increases */
  fmt = color( 'increase', '%d performance increases (%d)' );
  console.log( fmt, stats.increases || 0, stats.netIncreases || 0.0 );

  /* Performance Decreases */
  fmt = color( 'decrease', '%d performance decreases (%d)' );
  console.log( fmt, stats.decreases || 0, stats.netDecreases || 0.0 );

};