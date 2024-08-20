import * as Error from "./error";
import { invalidCredentials } from "src/globals/errors/auth";
import isAuthenticated from "./authenticate";
import checkSuperAdmin from "./checkSuperAdmin";
import checkAdmin from "./checkAdmin";
export {
  Error,
  invalidCredentials,
  isAuthenticated,
  checkSuperAdmin,
  checkAdmin,
};
