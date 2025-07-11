import fse from "fs-extra";
import { simpleGit } from "simple-git";
import ora from 'ora';
import { GIT_URL } from "./env.js";
import { selizeInput, selizeConfirm } from "./modules/index.js";

const init = async () => {
  try {
    const name = await selizeInput({ message: "Input project name: ", required: true });

    if (!name) {
      throw new Error("Project name is required");
    };

    const dir = `${process.cwd()}/${name}`;

    if (await fse.pathExists(dir)) {
      const overwrite = await selizeConfirm({ message: `Project is already exists. Overwrite?` });

      if (overwrite === null) {
        throw new Error("Project already exists");
      } else if (overwrite === false) {
        throw new Error("User canceled operation.");
      } else if (overwrite === true) {
        await fse.remove(dir);
      }
    }
    return {
      name,
    };
  } catch (error) {
    throw error;
  }
}

export const selizeCreate = async (): Promise<void> => {
  try {
    const result = await init();

    if (!result) {
      throw new Error("Initialization failed or canceled.");
    }

    const { name } = result;

    const spinner = ora('Cloning repo...').start();

    await simpleGit().clone(GIT_URL, name);

    spinner.succeed('Cloning complete!');
  } catch (error) {
    ora().fail("error");
    throw error;
  }
}