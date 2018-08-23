'use strict';

const spawn = require( 'child_process' ).spawn;

const workerProcess = spawn( process.execPath, args, { stdio: 'inherit' } );
workerProcess.on( 'exit', ( exitCode, signal ) => {
  process.on( 'exit', () => {
    if ( signal )
      process.kill( process.pid, signal );
    else
      process.exit( exitCode );
  } );
} );

process.on( 'SIGINT', () => {
  workerProcess.kill( 'SIGINT' );
  workerProcess.kill( 'SIGTERM' );
} );