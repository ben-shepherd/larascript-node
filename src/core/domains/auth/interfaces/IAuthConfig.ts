import IApiTokenModel from "@src/core/domains/auth/interfaces/IApitokenModel";
import IApiTokenRepository from "@src/core/domains/auth/interfaces/IApiTokenRepository";
import { IAuthService } from "@src/core/domains/auth/interfaces/IAuthService";
import IUserModel from "@src/core/domains/auth/interfaces/IUserModel";
import IUserRepository from "@src/core/domains/auth/interfaces/IUserRepository";
import { IInterfaceCtor } from "@src/core/domains/validator/interfaces/IValidator";
import { ModelConstructor } from "@src/core/interfaces/IModel";
import { RepositoryConstructor } from "@src/core/interfaces/IRepository";
import { ServiceConstructor } from "@src/core/interfaces/IService";

import { IPermissionsConfig } from "./IPermissionsConfig";

export interface IAuthConfig {
    service: {
        authService: ServiceConstructor<IAuthService>;
    };
    models: {
        user: ModelConstructor<IUserModel>;
        apiToken: ModelConstructor<IApiTokenModel>;
    };
    repositories: {
        user: RepositoryConstructor<IUserModel, IUserRepository>;
        apiToken: RepositoryConstructor<IApiTokenModel, IApiTokenRepository>;
    };
    validators: {
        createUser: IInterfaceCtor;
        updateUser: IInterfaceCtor;
    };
    jwtSecret: string,
    enableAuthRoutes: boolean;
    enableAuthRoutesAllowCreate: boolean;
    permissions: IPermissionsConfig;
}