import BaseProvider from "@src/core/base/Provider";
import MakeCmdCommand from "@src/core/domains/make/commands/MakeCmdCommand";
import MakeListenerCommand from "@src/core/domains/make/commands/MakeListenerCommand";
import MakeModelCommand from "@src/core/domains/make/commands/MakeModelCommand";
import MakeObserverCommand from "@src/core/domains/make/commands/MakeObserverCommand";
import MakeProviderCommand from "@src/core/domains/make/commands/MakeProviderCommand";
import MakeRepositoryCommand from "@src/core/domains/make/commands/MakeRepositoryCommand";
import MakeServiceCommand from "@src/core/domains/make/commands/MakeServiceCommand";
import MakeSingletonCommand from "@src/core/domains/make/commands/MakeSingletonCommand";
import MakeSubscriberCommand from "@src/core/domains/make/commands/MakeSubscriberCommand";
import { App } from "@src/core/services/App";
import MakeMiddlewareCommand from "../commands/MakeMiddlewareCommand";
import MakeRoutesCommand from "../commands/MakeRoutesCommand";

export default class MakeProvider extends BaseProvider
{
    async register(): Promise<void> 
    {
        console.log('Registering MakeProvider')    

        App.container('console').register().registerAll([
            MakeCmdCommand,
            MakeListenerCommand,
            MakeModelCommand,
            MakeObserverCommand,
            MakeRepositoryCommand,
            MakeServiceCommand,
            MakeSingletonCommand,
            MakeSubscriberCommand,
            MakeProviderCommand,
            MakeRoutesCommand,
            MakeMiddlewareCommand,
        ])
    }

    async boot(): Promise<void> 
    {
        console.log('Booting MakeProvider')    
    }
}
