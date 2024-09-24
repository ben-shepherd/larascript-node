import { App } from "@src/core/services/App";

import CurrentRequest from "../../express/services/CurrentRequest";
import { BaseRequest } from "../../express/types/BaseRequest.t";
import UnauthorizedError from "../exceptions/UnauthorizedError";

class AuthRequest {

    /**
     * Attempts to authorize a request with a Bearer token.
     * 
     * If successful, attaches the user and apiToken to the request. Sets the user in the App.
     * 
     * @param req The request to authorize
     * @returns The authorized request
     * @throws UnauthorizedError if the token is invalid
     */
    public static async attemptAuthorizeRequest(req: BaseRequest): Promise<BaseRequest> {
        const authorization = (req.headers.authorization ?? '').replace('Bearer ', '');

        const apiToken = await App.container('auth').attemptAuthenticateToken(authorization)

        const user = await apiToken?.user()

        if(!user || !apiToken) {
            throw new UnauthorizedError();
        }

        req.user = user;
        req.apiToken = apiToken
        
        CurrentRequest.set(req, 'user', user);
        CurrentRequest.set(req, 'userId', user?.getId())

        return req;
    }

}

export default AuthRequest