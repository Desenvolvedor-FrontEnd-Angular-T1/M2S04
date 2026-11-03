// config.ts - um TOKEN de injeção. Serve para injetar valores que NÃO são classes (texto, número, objeto de config).
import { InjectionToken } from '@angular/core';

// O texto entre aspas é só um rótulo para mensagens de erro. A "chave" real é a própria constante NOME_BIBLIOTECA.
// factory: valor PADRÃO usado quando ninguém sobrescrever. providedIn: 'root' o registra globalmente.
export const NOME_BIBLIOTECA = new InjectionToken<string>('NOME_BIBLIOTECA', {
  providedIn: 'root',
  factory: () => 'Biblioteca Central SENAI',
});
