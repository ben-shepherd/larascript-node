/**
 * Order array type
 */
export type OrderArray = Record<string, 'ASC' | 'DESC'>[]

/**
 * Options for select query
 */
export type SelectOptions = {

    /**
     * Table name
     */
    tableName: string

    /**
     * Fields to select
     */
    fields?: string[]

    /**
     * Filter for query
     */
    filter?: object

    /**
     * Order by
     */
    order?: OrderArray

    /**
     * Limit
     */
    limit?: number
}

/**
 * Query builder for Postgres
 */
class PostgresQueryBuilder {

    /**
     * Build select query
     * @param options Select options
     * @returns Query string
     */
    select({ fields, tableName, filter = {}, order = [], limit = undefined }: SelectOptions): string {
        let queryStr = `SELECT ${this.selectColumnsClause(fields)} FROM "${tableName}"`;

        if(Object.keys(filter ?? {}).length > 0) {
            queryStr += ` WHERE ${this.whereClause(filter)}`;
        }

        if(order.length > 0) {
            queryStr += ` ORDER BY ${this.orderByClause(order)}`
        }

        if(limit) {
            queryStr += ` LIMIT ${limit}`
        }

        return queryStr;
    }

    /**
     * Build select columns clause
     * @param fields Fields to select
     * @returns Select columns clause
     */
    selectColumnsClause(fields: string[] | null = null): string {
        return fields ? fields.join(', ') : '*';
    }

    /**
     * Build order by clause
     * @param orders Orders
     * @returns Order by clause
     */
    orderByClause(orders: Record<string, 'ASC' | 'DESC'>[] = []): string {
        return orders.map((order) => {
            return Object.keys(order).map((key) => {
                return `"${key}" ${order[key]}`
            }).join(', ')
        }).join(', ');

    }

    /**
     * Build where clause
     * @param filter Filter
     * @returns Where clause
     */
    whereClause(filter: object = {}): string {
        return Object.keys(filter).map((key) => {
            const value = filter[key];

            if(value === null) {
                return `"${key}" IS NULL`;
            }
            
            return `"${key}" = :${key}`
        }).join(' AND ');
    }

}

/**
 * Default export
 */
export default PostgresQueryBuilder
