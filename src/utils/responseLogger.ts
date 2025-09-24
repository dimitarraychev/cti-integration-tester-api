import { BaseResponse } from "../types/baseTypes.js";

export const logResponse = (response: BaseResponse) => {
  console.log(`========== RESPONSE  ==========`);
  console.log(JSON.stringify(response, null, 2));
  console.log("========== END RESPONSE ==========");
};
