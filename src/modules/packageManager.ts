import fs from 'fs-extra';
import { join } from 'path';

const rootDir = process.cwd();

const packageJsonPath = join(rootDir, 'package.json');
let packageJson = await fs.readJson(join('package.json'));

/**
 * 设置项目包管理器
 * @param packageManager 包管理器名称
 * @returns 
 */
export const setPackageManager = async (packageManager: string): Promise<void> => {
  try {
    if (!packageJson.packageManager) {
      packageJson.packageManager = packageManager;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
  } catch (error) {
    throw new Error("Failed to set package manager");
  }
}

/**
 * 获取项目包管理器
 * @returns 包管理器
 */
export const getPackageManager = async (): Promise<string> => {
  try {
    if (packageJson.packageManager) {
      return packageJson.packageManager;
    }
    return 'npm';
  } catch (error) {
    throw new Error("Failed to get package manager");
  }
}


