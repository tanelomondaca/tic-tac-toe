import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  subs = new Subscription();
  hayGanador: boolean;
  hayEmpate: boolean;
  vsMaquina: boolean;

  constructor(private readonly jugarService: JuegoService) {}

  ngOnInit(): void {
    this.iniciarSubs();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  iniciarSubs() {
    const subGanador = this.jugarService.hayGanador$.subscribe((resp) => {
      this.hayGanador = resp;
    });
    const subEmpate = this.jugarService.hayEmpate$.subscribe((resp) => {
      this.hayEmpate = resp;
    });
    const subMaquina = this.jugarService.vsMaquina$.subscribe((resp) => {
      this.vsMaquina = resp;
    });
    this.subs.add(subGanador);
    this.subs.add(subEmpate);
    this.subs.add(subMaquina);
  }
  reiniciar() {
    this.jugarService.reiniciar();
  }
  cambiarAdversario() {
    // this.contraMaquina = !this.contraMaquina;
    this.jugarService.vsMaquina$.next(!this.vsMaquina);
    this.jugarService.reiniciar();
  }
}
