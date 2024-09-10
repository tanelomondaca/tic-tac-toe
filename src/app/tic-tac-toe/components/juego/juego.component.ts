import { Component, OnDestroy, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnDestroy, OnInit {
  hayGanador: boolean;
  hayEmpate: boolean;
  vsMaquina: boolean;
  isPlayerOne = true;
  casillas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  jugador = 1;
  primeraJugada = false;
  lineas: Array<number[]> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  subs = new Subscription();
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
      console.log('cambio de adversario', resp)
      this.vsMaquina = resp;
    });
    const subReiniciar = this.jugarService.reiniciar$.subscribe(() =>
      this.reiniciar()
    );
    this.subs.add(subGanador);
    this.subs.add(subEmpate);
    this.subs.add(subMaquina);
    this.subs.add(subReiniciar);
  }

  detenerJuego = () => {
    return this.hayGanador || this.hayEmpate;
  };

  jugar(indexCasilla: number) {
    if (!this.isPlayerOne && this.vsMaquina) return;
    if (this.detenerJuego()) {
      return;
    }
    const casilla = this.casilla(indexCasilla);
    if (casilla.innerHTML == '') {
      casilla.innerHTML = this.isPlayerOne ? 'x' : 'o';
      this.primeraJugada = true;
      this.verificarGanador();
      this.isPlayerOne = !this.isPlayerOne;
    }
    console.log(this.vsMaquina, this.detenerJuego())
    if (this.vsMaquina && !this.detenerJuego()) {
      setTimeout(() => {
        this.jugarIA();
      }, 500);
    }
  }
  casilla(index: number): HTMLElement {
    return document.getElementById(index.toString());
  }
  jugarIA() {
    if (this.evitarTriunfo()) {
      this.verificarGanador();
      this.isPlayerOne = !this.isPlayerOne;
    } else {
      let indexCasilla = this.getRandomInt(9);
      const casilla = this.casilla(indexCasilla);
      if (casilla.innerHTML == '') {
        casilla.innerHTML = 'o';
        this.verificarGanador();
        this.isPlayerOne = !this.isPlayerOne;
      } else {
        this.jugarIA();
      }
    }
  }
  evitarTriunfo() {
    // revisar por cada linea si hay dos 'x'
    // si las hay, colocar un 'o' en la que no lo tiene
    let casiGanador = false;
    this.lineas.some((linea) => {
      let conteoX = 0;
      let conteoO = 0;
      linea.forEach((casilla) => {
        const divCasilla = document.getElementById(casilla.toString());
        if (divCasilla.innerHTML == 'x') {
          conteoX++;
        }
        if (divCasilla.innerHTML == 'o') {
          conteoO++;
        }
      });
      //TODO: Mejorar funcion de triunfo
      if (conteoO == 2) {
        const index = linea.find(
          (i) => document.getElementById(i.toString()).innerHTML != 'o'
        );
        if (document.getElementById(index.toString()).innerHTML == '') {
          document.getElementById(index.toString()).innerHTML = 'o';
          casiGanador = true;
          return true;
        }
      } else if (conteoX == 2) {
        const index = linea.find(
          (x) => document.getElementById(x.toString()).innerHTML != 'x'
        );
        if (document.getElementById(index.toString()).innerHTML == '') {
          document.getElementById(index.toString()).innerHTML = 'o';
          casiGanador = true;
          return true;
        }
      }
    });
    return casiGanador;
  }

  verificarGanador() {
    if (this.verificarLinea()) {
      // this.hayGanador = true;
      this.jugarService.hayGanador$.next(true);
      this.jugador = this.isPlayerOne ? 1 : 2;
    } else {
      const hayEmpate = !this.casillas.some(
        (i) => this.casilla(i).innerHTML == ''
      );
      this.jugarService.hayEmpate$.next(hayEmpate);
    }
  }

  verificarLinea() {
    let hayLineaGanadora = false;
    this.lineas.forEach((linea) => {
      const aHTML = this.casilla(linea[0]).innerHTML;
      const bHTML = this.casilla(linea[1]).innerHTML;
      const cHTML = this.casilla(linea[2]).innerHTML;

      if (aHTML !== '' && aHTML == bHTML && bHTML == cHTML) {
        hayLineaGanadora = true;
        this.casilla(linea[0]).style.color = 'green';
        this.casilla(linea[1]).style.color = 'green';
        this.casilla(linea[2]).style.color = 'green';
      }
    });
    return hayLineaGanadora;
  }

  reiniciar() {
    this.primeraJugada = false;
    // this.jugarService.hayGanador$.next(false);
    // this.jugarService.hayEmpate$.next(false);
    this.isPlayerOne = true;
    for (let i = 0; i < 9; i++) {
      this.casilla(i).innerHTML = '';
      this.casilla(i).style.color = 'white';
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
