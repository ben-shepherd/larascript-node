/* eslint-disable no-unused-vars */
import { IDatabaseDocument } from "@src/core/domains/database/interfaces/IDocumentManager";
import IModelData from "@src/core/interfaces/IModelData";

export type IBelongsToCtor = new () => IBelongsTo;

export interface IBelongsToOptions {
    localKey: keyof IModelData;
    foreignKey: keyof IModelData;
    foreignTable: string;
    filters?: object;
}

export interface IBelongsTo {
    handle(
        connection: string,
        document: IDatabaseDocument,
        options: IBelongsToOptions
    ): Promise<IModelData | null>;
}