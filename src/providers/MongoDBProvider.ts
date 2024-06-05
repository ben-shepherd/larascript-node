import IMongoDbConfig from "../interfaces/IMongoDbConfig";
import MongoDB from "../services/MongoDB";
import Provider from "../base/Provider";

export default class MongoDBProvider extends Provider
{
    protected configPath: string = 'src/config/database/mongodb';
    protected config!: IMongoDbConfig;

    constructor() {
        super();
        this.init()
    }

    public async register(): Promise<void>
    {
        this.log('Registering MongoDBProvider');
        
        MongoDB.getInstance(this.config);
    }

    public async boot(): Promise<void>
    {
        this.log('Booting MongoDBProvider');

        await MongoDB.getInstance().connect();
        
        this.log('Database connected successfully');
    }
}