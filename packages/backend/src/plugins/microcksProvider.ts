import {coreServices, createBackendModule} from "@backstage/backend-plugin-api";
import {MicrocksApiEntityProvider} from "@microcks/microcks-backstage-provider";
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import {loggerToWinstonLogger} from "@backstage/backend-common";

export default createBackendModule({
  pluginId: 'microcks',
  moduleId: 'microcksProvider',
  register(reg) {
    reg.registerInit({
      deps: {
        catalog: catalogProcessingExtensionPoint,
        config: coreServices.rootConfig,
        logger: coreServices.logger,
        scheduler: coreServices.scheduler,
      },
      async init({ catalog, config, logger, scheduler }) {
        catalog.addEntityProvider(
          MicrocksApiEntityProvider.fromConfig(config, {
            logger: loggerToWinstonLogger(logger),
            scheduler: scheduler,
            schedule: scheduler.createScheduledTaskRunner({
              frequency: { minutes: 2 },
              timeout: { minutes: 1 },
            }),
          })
        )
      },
    });
  },
});