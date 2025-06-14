import fs from 'fs-extra';
import { join } from 'path';
import { exec } from 'child_process';
// import { snetRun } from '@snet/core';

import { getPackageManager } from './modules/index.js';

export const snetRun = (value: { env: string; port: string; }): void => {
  const packageManager = getPackageManager();

  exec(`ts-node ./src/app.server.js --${value.env} --port ${value.port}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}