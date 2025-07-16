import { deepFreeze } from "@selize/utils"

export const DEBUG_PORT: string = deepFreeze("2344")
export const DEBUG_HOST: string = deepFreeze('localhost')

export const RUN_PORT: string = deepFreeze("2345")
export const RUN_HOST: string = deepFreeze('localhost')

export const GIT_URL: string = deepFreeze("https://gitclone.com/github.com/snroe/selize-demo.git")

export const CLEAN_DIRS: readonly string[] = deepFreeze([
  'dist',
  'out',
  'node_modules',
  '.selize',
])