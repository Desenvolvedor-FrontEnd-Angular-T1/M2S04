// playground.mjs - COMPLETE os TODOs de cada seção. Rode com: npm install && npm start
import { Observable, of, from, interval, timer, catchError, map, filter, take } from 'rxjs';

// ---------- FERRAMENTA DE APOIO (não precisa decifrar agora) ----------
// Subscreve um Observable, imprime tudo com um rótulo e devolve uma Promise que resolve quando ele termina.
// Serve só para as seções saírem em ordem no terminal.
function rodar(rotulo, obs$) {
  return new Promise((resolve) => {
    obs$.subscribe({
      next: (valor) => console.log(`  [${rotulo}] next:`, valor),
      error: (erro) => { console.log(`  [${rotulo}] error:`, erro.message); resolve(); },
      complete: () => { console.log(`  [${rotulo}] complete`); resolve(); },
    });
  });
}
function titulo(texto) { console.log(`\n=== ${texto} ===`); }
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// ===== 1. Observable manual =====
titulo('1. Observable manual (o produtor)');
// TODO 1: crie const cafe$ = new Observable((subscriber) => { ... }) que emite '☕ espresso', '☕ cappuccino' e completa.
//         Dica: subscriber.next(valor) entrega; subscriber.complete() encerra.
// TODO 2: faça cafe$.subscribe({ next, error, complete }) imprimindo cada pedido e "fim dos pedidos".

// ===== 2. of e from =====
titulo('2. of() e from()');
// TODO 3: await rodar('of', of('A', 'B', 'C'));
// TODO 4: await rodar('from', from([10, 20, 30]));

// ===== 3. interval + take =====
titulo('3. interval() + take()');
// TODO 5: await rodar('interval', interval(300).pipe(take(4)));  // o que acontece se você esquecer o take?

// ===== 4. pipe(filter, map) =====
titulo('4. pipe(filter, map)');
// TODO 6: de from([1,2,3,4,5,6]) deixe passar só os PARES e multiplique cada um por 10. Esperado: 20, 40, 60.

// ===== 5. Lazy / frio =====
titulo('5. Observable é preguiçoso');
// TODO 7: crie sorteio$ que emite Math.floor(Math.random()*100) e completa. Assine DUAS vezes com rodar(). Os números são iguais?

// ===== 6. unsubscribe =====
titulo('6. unsubscribe');
// TODO 8: const assinatura = interval(200).subscribe(n => console.log('tick', n)); await esperar(700); assinatura.unsubscribe();

// ===== 7. Promise x Observable =====
titulo('7. Promise x Observable');
// TODO 9: crie uma Promise e um Observable que imprimem "EXECUTOU" no corpo. Observe QUANDO cada um imprime.

// ===== 8. Erros =====
titulo('8. catchError');
// TODO 10: crie quebrado$ = timer(100).pipe(map(() => { throw new Error('API fora do ar'); }));
//          rode sem tratamento e depois com .pipe(catchError(() => of('valor reserva'))).
console.log('\nFim do playground.');
