import EventProvider from '@src/core/providers/EventProvider';
import { EnvironmentType } from '../core/consts/Environment';
import IAppConfig from '../core/interfaces/IAppConfig';
import AuthProvider from '../core/providers/AuthProvider';
import ExpressListenerProvider from '../core/providers/ExpressListenerProvider';
import ExpressProvider from '../core/providers/ExpressProvider';
import MongoDBProvider from '../core/providers/MongoDBProvider';
import RoutesProvider from '../core/providers/RoutesProvider';

/**
 * Available app configuration
 */
const appConfig: IAppConfig = {
    /**
     * The environment the app is running in
     */
    environment: (process.env.APP_ENV as EnvironmentType) ?? 'development',
    
    /**
     * Service providers
     */
    providers: [
        new EventProvider(),
        new MongoDBProvider(),
        new ExpressProvider(),
        new RoutesProvider(),
        new AuthProvider(),
        new ExpressListenerProvider(),
    ],
};

export default appConfig;
