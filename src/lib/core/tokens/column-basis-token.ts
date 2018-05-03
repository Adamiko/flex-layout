/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {InjectionToken} from '@angular/core';

export const COLUMN_BASIS_ZERO = new InjectionToken<boolean>(
  'Flex Layout token, should flex column stylings use 1e-09px as default value', {
    providedIn: 'root',
    factory: () => true
  });
