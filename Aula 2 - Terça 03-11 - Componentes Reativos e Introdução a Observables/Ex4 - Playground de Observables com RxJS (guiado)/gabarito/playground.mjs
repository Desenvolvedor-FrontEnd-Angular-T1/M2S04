// playground.mjs - GABARITO comentado. Rode com: npm install && npm start
import { Observable, of, from, interval, timer, catchError, map, filter, take, throwError } from 'rxjs';

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

// ===== 1. Criando um Observable "na mão" =====
titulo('1. Observable manual (o produtor)');
// new Observable(function) recebe um "subscriber": o canal por onde o produtor entrega valores.
const cafe$ = new Observable((subscriber) => {
  console.log('  (o balconista começou a preparar - só acontece QUANDO alguém se inscreve)');
  subscriber.next('☕ espresso');   // next = entrega um valor
  subscriber.next('☕ cappuccino');
  subscriber.complete();            // complete = "acabou, não vem mais nada"
});
// subscribe com um OBSERVER: três callbacks possíveis (next, error, complete).
cafe$.subscribe({
  next: (pedido) => console.log('  recebi:', pedido),
  error: (erro) => console.log('  erro:', erro),
  complete: () => console.log('  fim dos pedidos'),
});

// ===== 2. Funções de criação: of e from =====
titulo('2. of() e from()');
await rodar('of', of('A', 'B', 'C'));                 // of: emite cada argumento, um a um
await rodar('from', from([10, 20, 30]));              // from: emite cada item de uma lista (ou Promise)

// ===== 3. Tempo: interval + take =====
titulo('3. interval() + take()');
// interval(500) emitiria 0,1,2... PARA SEMPRE. take(4) pega 4 valores e completa sozinho.
await rodar('interval', interval(300).pipe(take(4)));

// ===== 4. Operadores com pipe: map e filter =====
titulo('4. pipe(filter, map)');
// pipe encadeia operadores, como uma linha de montagem: cada valor passa por todas as etapas.
await rodar(
  'pares x10',
  from([1, 2, 3, 4, 5, 6]).pipe(
    filter((n) => n % 2 === 0),   // só deixa passar os pares
    map((n) => n * 10),           // transforma cada valor
  ),
);

// ===== 5. Lazy (preguiçoso) e "frio" =====
titulo('5. Observable é preguiçoso; cada subscribe = execução nova');
const sorteio$ = new Observable((s) => { s.next(Math.floor(Math.random() * 100)); s.complete(); });
console.log('  (nada foi sorteado ainda: ninguém se inscreveu)');
await rodar('assinante 1', sorteio$);
await rodar('assinante 2', sorteio$);   // o número será DIFERENTE: execução independente

// ===== 6. Cancelando a inscrição =====
titulo('6. unsubscribe');
// subscribe devolve uma Subscription. Guardamos para poder cancelar.
const assinatura = interval(200).subscribe((n) => console.log('  tick', n));
await esperar(700);                       // deixa rodar ~3 ticks
assinatura.unsubscribe();                 // cancela: sem isso o interval rodaria para sempre (vazamento de memória!)
console.log('  cancelado - nenhum tick novo aparece');
await esperar(500);

// ===== 7. Promise x Observable =====
titulo('7. Promise x Observable');
const promessa = new Promise((resolve) => { console.log('  Promise EXECUTOU (imediatamente, sem then)'); resolve('valor único'); });
const obs$ = new Observable((s) => { console.log('  Observable EXECUTOU (só por causa do subscribe)'); s.next(1); s.next(2); s.complete(); });
console.log('  -> criei os dois; reparou que a Promise já rodou?');
await promessa.then((v) => console.log('  Promise entregou:', v));   // 1 valor, uma vez
await rodar('observable', obs$);                                       // vários valores, cancelável, preguiçoso

// ===== 8. Erros =====
titulo('8. Tratando erro com catchError');
const quebrado$ = timer(100).pipe(map(() => { throw new Error('API fora do ar'); }));
await rodar('sem tratamento', quebrado$);                             // termina com ERROR
await rodar('com catchError', quebrado$.pipe(catchError(() => of('valor reserva'))));  // troca o erro por um valor padrão
console.log('\nFim do playground.');
