import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// ✅ PASSO 1A · SOLUÇÃO: importamos a função que registra o HttpClient.
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // ✅ PASSO 1B · SOLUÇÃO: registra o HttpClient para o app INTEIRO.
    // Por quê? O TarefaService usa inject(HttpClient). Sem este provider o Angular
    // não sabe criar o HttpClient e lança "NullInjectorError: No provider for HttpClient".
    provideHttpClient(),
  ],
};
