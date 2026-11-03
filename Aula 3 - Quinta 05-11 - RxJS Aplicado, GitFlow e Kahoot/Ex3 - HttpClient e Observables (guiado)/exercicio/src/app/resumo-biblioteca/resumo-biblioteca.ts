// resumo-biblioteca.ts - consome um Observable com o async pipe (sem subscribe manual!).
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LivroService } from '../services/livro-service';

@Component({
  selector: 'app-resumo-biblioteca',
  imports: [AsyncPipe],                 // async é um pipe: precisa estar em imports
  templateUrl: './resumo-biblioteca.html',
  styleUrl: './resumo-biblioteca.css',
})
export class ResumoBiblioteca {
  protected totais$ = inject(LivroService).totais$;   // guardamos o OBSERVABLE; quem assina é o template
}
