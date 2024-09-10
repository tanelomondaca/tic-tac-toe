import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  hayGanador$ = new BehaviorSubject(false);
  hayEmpate$ = new BehaviorSubject(false);
  vsMaquina$ = new BehaviorSubject(false);
  reiniciar$ = new Subject<void>();

  constructor() {}

  reiniciar() {
    this.hayGanador$.next(false);
    this.hayEmpate$.next(false);
    this.reiniciar$.next();
  }
}
