import { Snowflake } from "@selize/utils";

const sf = new Snowflake();

/**
 * 
 * @returns uuid
 * @private
 */
export const uuid = () => {
  return sf.nextId().toString();
};