import fse from "fs-extra";
import { simpleGit } from "simple-git";
import ora from 'ora';
import { exec } from "child_process";

import { GIT_URL } from "./env.js";
import { snetInput, snetConfirm, snetSelect } from "./cli-ui.js";

const init = async () => {
  try {
    const name = await snetInput({ message: "Input project name: ", required: true });

    if (!name) {
      throw new Error("Project name is required");
    };

    const dir = `${process.cwd()}/${name}`;

    if (await fse.pathExists(dir)) {
      const overwrite = await snetConfirm({ message: `Project is already exists. Overwrite?` });

      if (overwrite === null) {
        throw new Error("Project already exists");
      } else if (overwrite === false) {
        throw new Error("User canceled operation.");
      } else if (overwrite === true) {
        await fse.remove(dir);
      }
    }

    const packageManager = await snetSelect({
      message: "Select packageManager: ",
      choices: [
        {
          name: "npm",
          value: "npm",
        },
        {
          name: "pnpm",
          value: "pnpm",
        },
        {
          name: "yarn",
          value: "yarn",
        }
      ]
    });

    return {
      name,
      packageManager,
    };
  } catch (error) {
    throw error;
  }
}

export const snetCreate = async (): Promise<void> => {
  try {
    const result = await init();

    if (!result) {
      throw new Error("Initialization failed or canceled.");
    }

    const { name, packageManager } = result;

    const spinner = ora('Cloning repo...').start();

    // await git.clone(GIT_URL, name, (error: Error) => {
    //   if (error) {
    //     console.log(error.message);
    //     spinner.fail('Clone failed');
    //     throw new Error("Clone failed");
    //   }
    //   spinner.succeed('Cloning complete!');
    // });

    await simpleGit().clone(GIT_URL, name);

    spinner.succeed('Cloning complete!');

    const installSpinner = ora('Installing dependencies...').start();

    exec(`cd ${name} && ${packageManager} install`, (error) => {
      if (error) {
        console.log(error.message);
        installSpinner.fail('Install failed');
        return;
      }
      installSpinner.succeed('Dependencies installed!');
    });

  } catch (error) {
    ora().fail("error");
    throw error;
  }
}