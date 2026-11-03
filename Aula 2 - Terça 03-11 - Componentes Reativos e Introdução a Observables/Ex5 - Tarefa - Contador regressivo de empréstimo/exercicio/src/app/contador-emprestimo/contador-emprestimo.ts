// contador-emprestimo.ts - COMPLETE (TAREFA)
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-emprestimo',
  templateUrl: './contador-emprestimo.html',
  styleUrl: './contador-emprestimo.css',
})
export class ContadorEmprestimo implements OnInit {
  // TODO 1: crie "segundos = input(10);" (importe input de @angular/core)
  // TODO 2: crie "protected restante = signal(0);"
  // TODO 3: injete o DestroyRef: private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // TODO 4: defina restante com o valor de segundos()
    // TODO 5: interval(1000).pipe(take(segundos), map(i => segundos - i - 1), takeUntilDestroyed(destroyRef))
    //         .subscribe(valor => this.restante.set(valor))
    //         (imports: interval, map, take de 'rxjs' | takeUntilDestroyed de '@angular/core/rxjs-interop')
  }
}
