// contador-compartilhado.ts - NÃO declara provider. Sobe a "árvore" de injetores até achar um (no App).
import { Component, inject } from '@angular/core';
import { ContadorService } from '../contador-service';

@Component({
  selector: 'app-contador-compartilhado',
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class ContadorCompartilhado {
  titulo = 'Compartilhado';
  protected service = inject(ContadorService);   // vem do provider declarado no App (pai)
}
