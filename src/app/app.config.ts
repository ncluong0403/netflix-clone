import { ApplicationConfig } from '@angular/core';
import { PreloadingStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
