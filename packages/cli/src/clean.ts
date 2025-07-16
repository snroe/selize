import { rimraf, rimrafSync, native, nativeSync } from 'rimraf';
import fse from 'fs-extra/esm';
import path from 'path';
import ora from 'ora';

import { selizeConfirm } from './modules/index.js';
import { CLEAN_DIRS } from './env.js'

const rootDir = process.cwd();

const filePaths = CLEAN_DIRS.map(dir =>
  path.resolve(rootDir, dir)
);

const cleanFiles = async () => {
  const spinner = ora('already clean...').start();

  // await rimraf(filePaths, (err) => {
  //   if (err) reject(err);
  //   else path.resolve();
  // });
  await rimraf(filePaths);

  spinner.succeed('Cleaning complete!');
}

export const selizeClean = async (): Promise<void> => {
  try {
    const clean = await selizeConfirm({ message: 'This will remove more files. Are you sure?' })
    if (clean === null) {
      console.log('you canceled.');
      return;
    } else if (clean === false) {
      console.log("you exit.");
      return;
    } else if (clean === true) {
      await cleanFiles();
    }
  } catch (error) {
    throw error;
  }
}