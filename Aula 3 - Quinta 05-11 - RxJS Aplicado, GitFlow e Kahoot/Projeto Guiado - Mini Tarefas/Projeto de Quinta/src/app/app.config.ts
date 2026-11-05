import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// 👉 TODO 1A: importe `provideHttpClient` de '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // 👉 TODO 1B: registre o provideHttpClient() aqui (sem ele o HttpClient não funciona)
  ],
};
