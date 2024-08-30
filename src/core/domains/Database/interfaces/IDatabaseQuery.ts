
export interface IDatabaseQuery {
    table(table: string): IDatabaseQuery;

    
    findById<T>(id: string): Promise<T | null>;
    findOne<T>(filter?: object, ...args: any[]): Promise<T | null>;
    findMany<T>(filter?: object, ...args: any[]): Promise<T[]>;
    
    insertOne<T>(doc: IDatabaseDocument, ...args: any[]): Promise<T>;
    insertMany<T>(docs: IDatabaseDocument[], ...args: any[]): Promise<T[]>;
    
    updateOne<T>(doc: IDatabaseDocument, ...args: any[]): Promise<T>;
    updateMany<T>(docs: IDatabaseDocument[], ...args: any[]): Promise<T>;
    
    deleteOne<T>(doc: IDatabaseDocument): Promise<T>;
    deleteMany<T>(docs: IDatabaseDocument[]): Promise<T>;

    truncate(): Promise<void>;
}

export interface IDatabaseDocument {
    id?: any;
    [key: string]: any;
}