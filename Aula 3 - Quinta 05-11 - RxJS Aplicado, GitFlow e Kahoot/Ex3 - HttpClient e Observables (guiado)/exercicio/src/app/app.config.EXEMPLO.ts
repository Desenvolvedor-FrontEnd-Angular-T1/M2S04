// app.config.EXEMPLO.ts - NÃO substitua o seu app.config.ts! Só ACRESCENTE a linha provideHttpClient()
// dentro do array "providers" que já existe. Sem ela: NullInjectorError: No provider for HttpClient.
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';   // registra o HttpClient para injeção

export const appConfigExemplo: ApplicationConfig = {
  providers: [
    provideHttpClient(),   // <- A LINHA NOVA
    // ...mantenha aqui os providers que o seu projeto já tem (provideRouter, etc.)
  ],
};
