import IAuthorizedRequest from "@src/core/domains/auth/interfaces/IAuthorizedRequest";
import ISecurityRequest from "@src/core/domains/auth/interfaces/ISecurityRequest";
import IValidatorRequest from "@src/core/domains/express/interfaces/IValidatorRequest";
import { Request } from "express";

import IRequestIdentifiable from "../../auth/interfaces/IRequestIdentifiable";

/**
 * Extends the express Request object with auth and validator properties.
 */
export type BaseRequest = Request & IAuthorizedRequest & IValidatorRequest & ISecurityRequest & IRequestIdentifiable;