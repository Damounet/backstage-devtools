/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// https://github.com/backstage/backstage/blob/master/packages/backend-next/src/authModuleGithubProvider.ts

import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  DEFAULT_NAMESPACE,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import { gitlabAuthenticator } from '@backstage/plugin-auth-backend-module-gitlab-provider';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';

export default createBackendModule({
  pluginId: 'auth',
  moduleId: 'gitlabProvider',
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      async init({ providers }) {
        providers.registerProvider({
          providerId: 'gitlab',
          factory: createOAuthProviderFactory({
            authenticator: gitlabAuthenticator,
            async signInResolver({ result: { fullProfile } }, ctx) {
              const userId = fullProfile.username;
              if (!userId) {
                throw new Error(
                  `Gitlab user profile does not contain a username`,
                );
              }

              const userEntityRef = stringifyEntityRef({
                kind: 'User',
                name: userId,
                namespace: DEFAULT_NAMESPACE,
              });

              return ctx.issueToken({
                claims: {
                  sub: userEntityRef,
                  ent: [userEntityRef],
                },
              });
            },
          }),
        });
      },
    });
  },
});