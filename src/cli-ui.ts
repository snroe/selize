import { input, select, confirm, password, expand, editor, number, rawlist } from '@inquirer/prompts';
// import toggle from "inquirer-toggle";

/**
 * 自由文本输入组件
 * @param {object} config - 包含用户消息和是否必填标志的对象
 * @param {string} config.message - 用户需要输入的消息，必须是非空字符串
 * @param {boolean} config.required - 标志输入是否为必填项，必须为布尔类型
 * @throws 如果message不是非空字符串或required不是布尔类型，则抛出错误
 * @returns 返回用户输入的结果
 * 
 * @example
 * const result = snetInput({message:'请输入内容',required:true})
 */
export const snetInput = (config: { message: string, required: boolean }): Promise<any> => {
  const { message, required } = config;

  if (typeof message !== 'string' || message.trim() === '') {
    throw new Error('Invalid message: must be a non-empty string');
  }
  if (typeof required !== 'boolean') {
    throw new Error('Invalid required flag: must be a boolean');
  }

  const result = input({
    message,
    required,
  });
  return result;

};


/**
 * 异步显示选项选择界面并获取用户选择结果
 * @param {string} config.message - 展示给用户的提示信息
 * @param {Array} config.choices - 可供选择的选项数组，元素应为包含name/value属性的对象
 * @param {string} config.choices.name - 选项名称，必须为字符串
 * @param {string} config.choices.value - 选项值，必须为字符串
 * @returns {Promise<*>} 返回包含用户选择结果的Promise对象
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetSelect({message: '请选择选项',choices:  [{ name: '选项1', value: '1' }, { name: '选项2', value: '2' }]})
 */
export const snetSelect = async (config: { message: string, choices: { name: string, value: string }[] }): Promise<string> => {
  const { message, choices } = config;

  if (typeof message !== 'string' || message.trim() === '') {
    throw new Error('Invalid message: must be a non-empty string');
  }
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new Error('Invalid choices: must be a non-empty array');
  }

  const result: string = await select({
    message,
    choices,
  });

  return result;
};

/**
 * 异步确认对话框函数
 * @param {string} message - 对话框中显示的消息内容
 * @returns {Promise<boolean>} 返回Promise对象，解析用户操作结果（确认/取消）
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetConfirm('是否确认操作？')
 */
export const snetConfirm = async ({ message }: { message: string }): Promise<boolean> => {
  try {
    const a = await confirm({
      message,
    });
    return a;
  } catch (error) {
    throw error;
  }
};

/**
 * 创建交互式确认提示框（返回布尔值的异步操作）
 * 
 * @param {string} message - 需要展示给用户的提示信息内容
 * @param {Object} [options] - （可选）扩展配置参数对象
 * @returns {Promise<boolean>} 返回Promise对象，解析后得到用户确认状态：
 *                             true表示确认，false表示取消
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetToggle({message: '是否确认操作？'})
 */
// export const snetToggle = async ({ message }: { message: string }): Promise<Boolean> => {
//   try {
//     const a = await toggle({
//       message: message,
//       default: false,
//     });
//     return a;
//   } catch (error) {
//     throw error;
//   }
// };

/**
 * 异步获取密码输入
 * 
 * @param {string} message - 显示给用户的密码输入提示信息
 * @param {Object} [options] - 密码输入配置选项（可选）
 *     @property {Function} [options.validate] - 密码验证函数
 *     @property {boolean} [options.mask=true] - 是否隐藏输入内容
 *     @property {number} [options.timeout] - 输入超时时间（毫秒）
 * @returns {Promise<string|null>} 返回Promise对象：
 *     - 解析后得到用户输入的密码字符串
 *     - 用户取消输入时返回null
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetPassword('请输入密码')
 */
export const snetPassword = async ({ message }: { message: string }): Promise<string> => {
  try {
    const result = await password({
      message,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * 异步执行消息扩展操作，封装expand函数的调用和错误处理
 * 
 * @param {Object|string} config.message - 需要扩展处理的消息主体，支持对象或字符串格式
 * @returns {Promise} 返回expand操作的异步结果，错误时返回undefined
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetExpand({})
 */
// export const snetExpand = async (config: { message: string, choices: { key: string; name: string; }[] }): Promise<string> => {
//   const { message, choices } = config;

//   if (typeof message !== 'string' || message.trim() === '') {
//     throw new Error('Invalid message: must be a non-empty string');
//   }
//   if (!Array.isArray(choices) || choices.length === 0) {
//     throw new Error('Invalid choices: must be a non-empty array');
//   }

//   const result = await expand({
//     message,
//     choices
//   });
//   return result;
// };

/**
 * 异步执行富文本编辑器初始化操作
 * 
 * @param {string} config.message - 需要展示的提示信息或初始文本内容
 * @returns {Promise<Object>|undefined} 返回编辑器实例的Promise对象，失败时返回undefined
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetEditor('请输入文本内容', {})
 */
// export const snetEditor = async (config: { message: string }): Promise<Object> => {
//   const { message } = config;

//   if (typeof message !== 'string' || message.trim() === '') {
//     throw new Error('Invalid message: must be a non-empty string');
//   }

//   const result = await editor({
//     message,
//   });

//   return result;
// };

/**
 * 异步获取数字输入
 * 
 * @param {string} message - 显示给用户的提示信息
 * @returns {Promise<number|undefined>} 返回解析后的数字值，出错时返回undefined
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetNumber('请输入年龄', { min: 0, max: 120 });
 */
// export const snetNumber = async ({ message }: { message: string }): Promise<number | undefined> => {
//   try {
//     const a = await number({
//       message,
//     });
//     return a;
//   } catch (error) {
//     throw error;
//   }
// };

/**
 * 异步处理原始列表数据并返回处理结果
 * 
 * @param {*} message - 必需的消息或数据输入
 * @param {Object} options - 配置选项对象
 * @returns {Promise<*>} 返回处理结果的Promise，出错时返回undefined
 * @throws 当发生错误时抛出异常
 * 
 * @example
 * // 基本用法
 * const result = await snetRawlist('请选择选项', {})
 */
// export const snetRawlist = async ({ message }: { message: string }): Promise<any> => {
//   try {
//     const a = await rawlist({
//       message,
//     });
//     return a;
//   } catch (error) {
//     throw error;
//   }
// };

process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('until next time!');
  } else {
    throw error;
  }
});