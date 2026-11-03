// contador-isolado.ts - declara o PRÓPRIO provider => cada <app-contador-isolado> ganha uma instância nova.
import { Component, inject } from '@angular/core';
import { ContadorService } from '../contador-service';

@Component({
  selector: 'app-contador-isolado',
  templateUrl: './contador.html',
  styleUrl: './contador.css',
  // providers no componente = escopo do componente: nasce com ele e morre com ele.
  providers: [ContadorService],
})
export class ContadorIsolado {
  titulo = 'Isolado';
  protected service = inject(ContadorService);   // recebe a instância criada pelo providers acima
}
