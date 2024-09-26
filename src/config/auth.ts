import ApiToken from '@src/app/models/auth/ApiToken';
import User from '@src/app/models/auth/User';
import ApiTokenRepository from '@src/app/repositories/auth/ApiTokenRepository';
import UserRepository from '@src/app/repositories/auth/UserRepository';
import CreateUserValidator from '@src/app/validators/user/CreateUserValidator';
import UpdateUserValidator from '@src/app/validators/user/UpdateUserValidator';
import { IAuthConfig } from '@src/core/domains/auth/interfaces/IAuthConfig';
import AuthService from '@src/core/domains/auth/services/AuthService';
import parseBooleanFromString from '@src/core/util/parseBooleanFromString';

/**
 * Available groups
 */
export const GROUPS = {
    User: 'user',
    Admin: 'admin',
} as const

/**
 * Available roles
 */
export const ROLES = {
    USER: 'user',
    ADMIN: 'admin'
} as const

/**
 * Auth configuration
 */
const config: IAuthConfig = {
    service: {
        authService: AuthService
    },
    models: {
        user: User,
        apiToken: ApiToken
    },
    repositories: {
        user: UserRepository,
        apiToken: ApiTokenRepository
    },
    validators: {
        createUser: CreateUserValidator,
        updateUser: UpdateUserValidator,
    },

    /**
     * JWT secret
     */
    jwtSecret: process.env.JWT_SECRET as string ?? '',

    /**
     * Enable or disable auth routes
     */
    enableAuthRoutes: parseBooleanFromString(process.env.ENABLE_AUTH_ROUTES, 'true'),

    /**
     * Enable or disable create a new user endpoint
     */
    enableAuthRoutesAllowCreate: parseBooleanFromString(process.env.ENABLE_AUTH_ROUTES_ALLOW_CREATE, 'true'),

    /**
     * Permissions configuration
     * - user.defaultGroup will be the default group for new user accounts
     * - groups can be added to the user property 'groups' 
     *   these will automatically populate the roles property
     */
    permissions: {

        /**
         * The default user group
         */
        user: {
            defaultGroup: GROUPS.User,
        },

        /**
         * The list of groups
         */
        groups: [
            {
                name: GROUPS.User,
                roles: [ROLES.USER],
                scopes: []
            },
            {
                name: GROUPS.Admin,
                roles: [ROLES.ADMIN],
                scopes: []
            }
        ]
    }
}

export default config;