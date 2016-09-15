var server = require('./server.js');

var path = require('path'),
    argv = require('yargs').argv,
    chcpContext = require('./context.js');

var cmd = argv._[0];
switch(cmd) {
  case 'build':
  case 'login':
  case 'init':
  case 'server':
  case 'deploy':
    console.log('Running ' + cmd);
    var command = require('./' + cmd + '.js'),
      context = chcpContext.context(argv);
    command.execute(context);
    break;
  default:
    console.log('TODO: Should print usage instructions.');
    process.exit(0);
}