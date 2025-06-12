import { Command } from 'commander';

import { snetBuild } from './build.js';
import { snetClean } from './clean.js';
import { snetCreate } from './create.js';
import { snetDebug } from './debug.js';
import { snetRun } from './run.js';

import { DEBUG_PORT, RUN_HOST, RUN_PORT } from './env.js';

const program = new Command();

const version = '0.0.1';

program
  .name('snet-cli')
  .description('CLI to help you run snet projects')
  .version(version, '-v, --version', 'output the version number');

program.command('build')
  .description('build a snet project')
  .option('-e, --env <env>', 'environment</env>', 'dev')
  .action((value) => {
    snetBuild();
  });

program.command('clean')
  .description('clean a snet project')
  .action((value) => {
    snetClean();
  });

program.command('create')
  .description('create a new snet project')
  .action((value) => {
    snetCreate();
  });

program.command('debug')
  .description('output extra debugging')
  .option('-p, --port <number>', 'port number', DEBUG_PORT)
  .action((value) => {
    snetDebug();
  });

program.command('run')
  .description('run a snet project in some mode')
  // .arguments('')
  .option('-p, --port <number>', 'port number', RUN_PORT)
  .option('-e, --env <env>', 'environment</env>', 'dev')
  .action((value) => {
    snetRun();
  });

program.parse(process.argv);