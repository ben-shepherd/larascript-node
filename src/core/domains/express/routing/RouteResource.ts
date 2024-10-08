import resourceAction from "@src/core/domains/express/actions/resourceAction";
import resourceCreate from "@src/core/domains/express/actions/resourceCreate";
import resourceDelete from "@src/core/domains/express/actions/resourceDelete";
import resourceIndex from "@src/core/domains/express/actions/resourceIndex";
import resourceShow from "@src/core/domains/express/actions/resourceShow";
import resourceUpdate from "@src/core/domains/express/actions/resourceUpdate";
import { IRoute } from "@src/core/domains/express/interfaces/IRoute";
import { IRouteResourceOptions } from "@src/core/domains/express/interfaces/IRouteResourceOptions";
import Route from "@src/core/domains/express/routing/Route";
import RouteGroup from "@src/core/domains/express/routing/RouteGroup";
import routeGroupUtil from "@src/core/domains/express/utils/routeGroupUtil";

/**
 * Returns a group of routes for a given resource
 * - name.index - GET - /name
 * - name.show - GET - /name/:id
 * - name.update - PUT - /name/:id
 * - name.create - POST - /name
 * - name.delete - DELETE - /name/:id
 * 
 * @param options.resource - The model constructor of the resource
 * @param options.name - The name of the resource (will be used as the base path)
 * @param options.only - An array of resource types to include in the routes
 * @param options.except - An array of resource types to exclude from the routes
 * @param options.createValidator - A validator to use for the create route
 * @param options.updateValidator - A validator to use for the update route
 * @returns A group of routes that can be used to handle requests for the resource
 */
const RouteResource = (options: IRouteResourceOptions): IRoute[] => {
    const name = options.name.startsWith('/') ? options.name.slice(1) : options.name

    const routes = RouteGroup([
    // Get all resources
        Route({
            name: `${name}.index`,
            method: 'get',
            path: `/${name}`,
            action: resourceAction(options, resourceIndex)
        }),
        // Get resource by id
        Route({
            name: `${name}.show`,
            method: 'get',
            path: `/${name}/:id`,
            action: resourceAction(options, resourceShow)
        }),
        // Update resource by id
        Route({
            name: `${name}.update`,
            method: 'put',
            path: `/${name}/:id`,
            action: resourceAction(options, resourceUpdate),
            validator: options.updateValidator
        }),
        // Delete resource by id
        Route({
            name: `${name}.destroy`,
            method: 'delete',
            path: `/${name}/:id`,
            action: resourceAction(options, resourceDelete)
        }),
        // Create resource
        Route({
            name: `${name}.create`,
            method: 'post',
            path: `/${name}`,
            action: resourceAction(options, resourceCreate),
            validator: options.createValidator
        })
    ])

    // Apply only and except filters
    return routeGroupUtil.filterExcept(
        options.except ?? [],
        routeGroupUtil.filterOnly(options.only ?? [], routes)
    )
}

export default RouteResource