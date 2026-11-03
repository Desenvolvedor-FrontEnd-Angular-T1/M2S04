// historico.ts - lista o histórico mostrando data e hora.
import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';       // pipe = formata um valor no template
import { HistoricoService } from '../services/historico-service';

@Component({
  selector: 'app-historico',
  imports: [DatePipe],                             // pipes standalone também precisam ser importados
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {
  protected service = inject(HistoricoService);
  // Limpar delega ao service (o componente não conhece a lista interna).
  limpar(): void {
    this.service.limpar();
  }
}
