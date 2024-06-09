import Repository from "../../../base/Repository";
import { IRepository } from "../../../interfaces/IRepository";
import BaseApiTokenModel from "../models/BaseApiTokenModel";
import { BaseApiTokenData } from "../types/types.t";

type Constructor<M,D> = new (data: D) => M

export default class BaseApiTokenRepository<
    M extends BaseApiTokenModel = BaseApiTokenModel,
    D extends BaseApiTokenData = BaseApiTokenData
> extends Repository<BaseApiTokenModel> implements IRepository {

    constructor(model: Constructor<M,D> = BaseApiTokenModel as Constructor<M,D>) {
        super('apiTokens', model);
    }

    async findByToken(token: string): Promise<BaseApiTokenModel | null> {
        return await this.findOne({ token })
    }

    
    async findByUnrevokedToken(token: string): Promise<BaseApiTokenModel | null> {
        return await this.findOne({ token, revokedAt: null })
    }
}