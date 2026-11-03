// livro-service.ts - COMPLETE os TODOs seguindo o passo a passo do LEIAME.
import { Service, signal } from '@angular/core';
import { Livro } from '../models/livro';

// TODO 1: coloque o decorator @Service() logo acima da palavra "export".
//         (Angular anterior ao 22: @Injectable({ providedIn: 'root' }))
export class LivroService {
  // TODO 2: recorte a lista "livros" do app.ts e cole aqui como: private _livros = signal<Livro[]>([ ... ]);

  // TODO 3: exponha a versão somente leitura: readonly livros = this._livros.asReadonly();

  // TODO 4: crie emprestar(id: number): void e devolver(id: number): void.
  //         Dentro, use: this._livros.update((lista) => lista.map((l) => (l.id === id ? { ...l, disponivel: false } : l)));
}
