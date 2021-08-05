/*
 * Copyright 2021 The Backstage Authors
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
import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';
import { createCardExtension } from './extensions';

import { rootRouteRef } from './routes';

export const homePlugin = createPlugin({
  id: 'home',
  routes: {
    root: rootRouteRef,
  },
});

export const HomepageCompositionRoot = homePlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components').then(m => m.HomepageCompositionRoot),
    mountPoint: rootRouteRef,
  }),
);

export const ComponentAccordion = homePlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./componentRenderers').then(m => m.ComponentAccordion),
    },
  }),
);
export const ComponentTabs = homePlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./componentRenderers').then(m => m.ComponentTabs),
    },
  }),
);
export const ComponentTab = homePlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./componentRenderers').then(m => m.ComponentTab),
    },
  }),
);

export const RandomJokeHomePageComponent = homePlugin.provide(
  createCardExtension<{ defaultCategory?: 'programming' | 'any' }>({
    title: 'Random Joke',
    content: () =>
      import('./homePageComponents/RandomJoke/Content').then(m => m.Content),
    actions: () =>
      import('./homePageComponents/RandomJoke/Actions').then(m => m.Actions),
    contextProvider: () =>
      import('./homePageComponents/RandomJoke/Context').then(
        m => m.ContextProvider,
      ),
    settings: () =>
      import('./homePageComponents/RandomJoke/Settings').then(m => m.Settings),
  }),
);
