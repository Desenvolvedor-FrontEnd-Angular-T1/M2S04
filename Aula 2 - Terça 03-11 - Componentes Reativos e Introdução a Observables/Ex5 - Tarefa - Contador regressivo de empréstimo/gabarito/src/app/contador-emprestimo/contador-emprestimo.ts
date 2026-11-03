// contador-emprestimo.ts - mostra quanto tempo falta para devolver o livro (usa Observable + signal).
import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';   // cancela a inscrição quando o componente morre
import { interval, map, take } from 'rxjs';

@Component({
  selector: 'app-contador-emprestimo',
  templateUrl: './contador-emprestimo.html',
  styleUrl: './contador-emprestimo.css',
})
export class ContadorEmprestimo implements OnInit {
  // Quantos segundos dura o empréstimo (padrão 10, só para a aula não ficar longa).
  segundos = input(10);

  // Signal com o tempo restante: o template o lê e se atualiza sozinho.
  protected restante = signal(0);

  // DestroyRef = "gancho" para saber quando o componente será destruído.
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.restante.set(this.segundos());                      // começa mostrando o total
    interval(1000)                                           // emite 0,1,2... a cada 1000 ms
      .pipe(
        take(this.segundos()),                               // para depois de N emissões (vira complete)
        map((i) => this.segundos() - i - 1),                 // converte 0,1,2 em 9,8,7... (contagem regressiva)
        takeUntilDestroyed(this.destroyRef),                 // se o componente sair da tela, cancela (sem vazamento)
      )
      .subscribe((valor) => this.restante.set(valor));       // cada emissão atualiza o signal
  }
}
