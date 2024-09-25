import { IIdentifiableSecurityCallback, SecurityCallback } from "@src/core/domains/express/interfaces/ISecurity"
import authorizedSecurity from "@src/core/domains/express/rules/authorizedSecurity"
import hasRoleSecurity from "@src/core/domains/express/rules/hasRoleSecurity"
import hasScopeSecurity from "@src/core/domains/express/rules/hasScopeSecurity"
import resourceOwnerSecurity from "@src/core/domains/express/rules/resourceOwnerSecurity"
import Security from "@src/core/domains/express/services/Security"
import { BaseRequest } from "@src/core/domains/express/types/BaseRequest.t"
import { IModel } from "@src/core/interfaces/IModel"

/**
 * Security rules
 */
export interface ISecurityRules {
    // eslint-disable-next-line no-unused-vars
    [key: string]: (...args: any[]) => IIdentifiableSecurityCallback
}

/**
 * The list of security identifiers.
 */
export const SecurityIdentifiers = {
    AUTHORIZED: 'authorized',
    AUTHORIZED_THROW_EXCEPTION: 'authorizedThrowException',
    RESOURCE_OWNER: 'resourceOwner',
    HAS_ROLE: 'hasRole',
    HAS_SCOPE: 'hasScope',
    CUSTOM: 'custom'
} as const;

const SecurityRules: ISecurityRules = {

    /**
     * Checks if the request is authorized, i.e. if the user is logged in.
     * Does not throw exceptions on unauthorized requests.
     * @returns 
     */
    [SecurityIdentifiers.AUTHORIZED]: () => ({
        id: SecurityIdentifiers.AUTHORIZED,
        when: Security.getInstance().getWhenAndReset(),
        never: Security.getInstance().getNeverAndReset(),
        arguements: {
            throwExceptionOnUnauthorized: true
        },
        callback: (req: BaseRequest) => authorizedSecurity(req)
    }),

    /**
     * Checks if the request is authorized, i.e. if the user is logged in.
     * Throws an exception on unauthorized requests.
     * @returns 
     */
    [SecurityIdentifiers.AUTHORIZED_THROW_EXCEPTION]: () => ({
        id: SecurityIdentifiers.AUTHORIZED,
        when: Security.getInstance().getWhenAndReset(),
        never: Security.getInstance().getNeverAndReset(),
        arguements: {
            throwExceptionOnUnauthorized: true
        },
        callback: (req: BaseRequest) => authorizedSecurity(req)
    }),

    /**
     * Checks if the currently logged in user is the owner of the given resource.
     * @param attribute 
     * @returns 
     */
    [SecurityIdentifiers.RESOURCE_OWNER]: (attribute: string = 'userId') => ({
        id: SecurityIdentifiers.RESOURCE_OWNER,
        when: Security.getInstance().getWhenAndReset(),
        never: Security.getInstance().getNeverAndReset(),
        arguements: { key: attribute },
        callback: (req: BaseRequest, resource: IModel) => resourceOwnerSecurity(req, resource, attribute)
    }),

    /**
     * Checks if the currently logged in user has the given role.
     * @param roles 
     * @returns 
     */
    [SecurityIdentifiers.HAS_ROLE]: (roles: string | string[]) => ({
        id: SecurityIdentifiers.HAS_ROLE,
        when: Security.getInstance().getWhenAndReset(),
        never: Security.getInstance().getNeverAndReset(),
        callback: (req: BaseRequest) => hasRoleSecurity(req, roles)
    }),

    /**
     * Checks if the currently logged in user has the given scope(s).
     * @param scopes 
     * @returns 
     */
    [SecurityIdentifiers.HAS_SCOPE]: (scopes: string | string[]) => ({
        id: SecurityIdentifiers.HAS_SCOPE,
        also: SecurityIdentifiers.AUTHORIZED,
        when: Security.getInstance().getWhenAndReset(),
        never: Security.getInstance().getNeverAndReset(),
        callback: (req: BaseRequest) => hasScopeSecurity(req, scopes)
    }),

    /**
     * Custom security rule
     * @param callback 
     * @param rest 
     * @returns 
     */
    // eslint-disable-next-line no-unused-vars
    [SecurityIdentifiers.CUSTOM]: (callback: SecurityCallback, ...rest: any[]) => ({
        id: SecurityIdentifiers.CUSTOM,
        never: Security.getInstance().getNeverAndReset(),
        when: Security.getInstance().getWhenAndReset(),
        callback: (req: BaseRequest, ...rest: any[]) => {
            return callback(req, ...rest)
        }
    })
} as const

export default SecurityRules