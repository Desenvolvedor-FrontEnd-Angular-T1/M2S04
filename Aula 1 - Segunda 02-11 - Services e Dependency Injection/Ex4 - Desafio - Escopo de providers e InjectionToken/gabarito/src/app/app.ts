// app.ts - declara providers para os filhos e sobrescreve o valor padrão do token.
import { Component, inject } from '@angular/core';
import { NOME_BIBLIOTECA } from './config';
import { ContadorService } from './contador-service';
import { ContadorCompartilhado } from './contador-compartilhado/contador-compartilhado';
import { ContadorIsolado } from './contador-isolado/contador-isolado';

@Component({
  selector: 'app-root',
  imports: [ContadorCompartilhado, ContadorIsolado],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    ContadorService,                                                  // 1 instância para o App e TODOS os seus filhos
    { provide: NOME_BIBLIOTECA, useValue: 'Biblioteca do Bloco B' },  // sobrescreve o valor padrão do token só aqui
  ],
})
export class App {
  // Injeta o valor do token: sem o token, não há como "pedir" uma string ao Angular.
  protected nome = inject(NOME_BIBLIOTECA);
}
