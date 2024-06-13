import {authorize} from "@src/core/http/middleware/authorize";
import {Route} from "@src/core/interfaces/IRoute";
import create from "@src/core/domains/auth/actions/create";
import login from "@src/core/domains/auth/actions/login";
import user from "@src/core/domains/auth/actions/user";
import authConsts from "@src/core/domains/auth/consts/authConsts";

const routes: Route[] = [
    {
        name: authConsts.routes.authLogin,
        method: 'post',
        path: '/api/auth/login',
        action: login

    },
    {
        name: authConsts.routes.authCreate,
        method: 'post',
        path: '/api/auth/create',
        action: create
    },
    {
        name: authConsts.routes.authUser,
        method: 'get',
        path: '/api/auth/user',
        action: user,
        middlewares: [authorize()]
    }
]

export default routes;
