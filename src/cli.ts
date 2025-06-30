import { Command } from 'commander';

import { i18n } from './modules/index.js';
import { selizeBuild } from './build.js';
import { selizeClean } from './clean.js';
import { selizeCreate } from './create.js';
import { selizeDebug } from './debug.js';
import { selizeRun } from './run.js';

import { DEBUG_PORT, RUN_HOST, RUN_PORT } from './env.js';

const program = new Command();

const version = '0.1.4';

program
  .name('selize-cli')
  .description(i18n('cli_description'))
  .version(version, '-v, --version', 'output the version number');

program.command('build')
  .description(i18n('cli_build'))
  .option('-e, --env <env>', 'environment</env>', 'dev')
  .option('-o, --output <output>', 'output</output>', 'dist')
  .option('--lib', 'build lib')
  .action((value: { env: string, output: string, lib: boolean }) => {
    selizeBuild();
  });

program.command('clean')
  .description(i18n('cli_clean'))
  .action((value) => {
    selizeClean();
  });

program.command('create')
  .description(i18n('cli_create'))
  .action((value) => {
    selizeCreate();
  });

program.command('debug')
  .description(i18n('cli_debug'))
  .option('-p, --port <number>', 'port number', DEBUG_PORT)
  .action((value) => {
    selizeDebug();
  });

program.command('run')
  .description(i18n('cli_run'))
  // .arguments('')
  .option('-p, --port <number>', i18n('cli_run_port'), RUN_PORT)
  .option('-e, --env <env>', i18n('cli_run_env'), 'dev')
  .action((value: { env: string, port: string }) => {
    selizeRun(value);
  });

program.parse(process.argv);