// ✅ PASSO 5-IMPORTS · SOLUÇÃO: `model` vem do '@angular/core'.
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-campo-busca',
  templateUrl: './campo-busca.html',
})
export class CampoBusca {
  // ✅ PASSO 5A · SOLUÇÃO (model): é input + output no MESMO membro. Permite two-way binding
  // [(texto)] no pai: o pai manda o valor para cá e, quando fazemos texto.set(...), o pai já recebe
  // o novo valor de volta, sem precisar escrever um output separado.
  readonly texto = model('');
}
