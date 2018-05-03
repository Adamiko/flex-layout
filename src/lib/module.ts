/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional,
  PLATFORM_ID,
  Provider,
} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {
  ADD_FLEX_STYLES,
  ADD_ORIENTATION_BREAKPOINTS,
  BREAKPOINT,
  BreakPoint,
  COLUMN_BASIS_ZERO,
  DISABLE_DEFAULT_BREAKPOINTS,
  DISABLE_VENDOR_PREFIXES,
  SERVER_TOKEN
} from '@angular/flex-layout/core';
import {ExtendedModule} from '@angular/flex-layout/extended';
import {FlexModule} from '@angular/flex-layout/flex';
import {GridModule} from '@angular/flex-layout/grid';


/**
 * Since the equivalent results are easily achieved with a css class attached to each
 * layout child, these have been deprecated and removed from the API.
 *
 *  import {LayoutPaddingDirective} from './api/flexbox/layout-padding';
 *  import {LayoutMarginDirective} from './api/flexbox/layout-margin';
 */

/** a set of configuration options for FlexLayoutModule */
export interface FlexLayoutConfigOptions {
  addFlexStyles?: boolean;
  addOrientationBps?: boolean;
  breakpoints?: BreakPoint|BreakPoint[];
  disableDefaultBps?: boolean;
  disableVendorPrefixes?: boolean;
  serverLoaded?: boolean;
  useColumnBasisZero?: boolean;
}

/**
 *
 */
@NgModule({
  imports: [FlexModule, ExtendedModule, GridModule],
  exports: [FlexModule, ExtendedModule, GridModule]
})
export class FlexLayoutModule {

  /**
   * Initialize the FlexLayoutModule with a set of config options,
   * which sets the corresponding tokens accordingly
   */
  static withConfig(configOptions: FlexLayoutConfigOptions): ModuleWithProviders {
    const moduleProviders: Provider[] = [];

    if (configOptions.addFlexStyles === false) {
      moduleProviders.push({provide: ADD_FLEX_STYLES, useValue: false});
    }

    if (configOptions.addOrientationBps) {
      moduleProviders.push({provide: ADD_ORIENTATION_BREAKPOINTS, useValue: true});
    }

    if (configOptions.breakpoints) {
      moduleProviders.push({provide: BREAKPOINT, useValue: configOptions.breakpoints});
    }

    if (configOptions.disableDefaultBps) {
      moduleProviders.push({provide: DISABLE_DEFAULT_BREAKPOINTS, useValue: true});
    }

    if (configOptions.disableVendorPrefixes) {
      moduleProviders.push({provide: DISABLE_VENDOR_PREFIXES, useValue: true});
    }

    if (configOptions.serverLoaded) {
      moduleProviders.push({provide: SERVER_TOKEN, useValue: true});
    }

    if (configOptions.useColumnBasisZero === false) {
      moduleProviders.push({provide: COLUMN_BASIS_ZERO, useValue: false});
    }

    return {
      ngModule: FlexLayoutModule,
      providers: moduleProviders
    };
  }

  constructor (
    @Optional() @Inject(SERVER_TOKEN) serverModuleLoaded: boolean,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformServer(platformId) && !serverModuleLoaded) {
      console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
    }
  }
}
