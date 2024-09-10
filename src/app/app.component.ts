import {
  AfterContentChecked,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tic-tac-toe';
  casillas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  isPlayerOne = true;
  hayGanador = false;
  hayEmpate = false;
  detenerJuego = () => {
    return this.hayGanador || this.hayEmpate;
  };
  contraMaquina = false;
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

  jugar(indexCasilla: number) {
    if (!this.isPlayerOne && this.contraMaquina) return;
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
    if (this.contraMaquina && !this.detenerJuego()) {
      this.jugarIA();
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
  cambiarAdversario() {
    this.contraMaquina = !this.contraMaquina;
    this.reiniciar();
  }
  verificarGanador() {
    if (this.verificarLinea()) {
      this.hayGanador = true;
      this.jugador = this.isPlayerOne ? 1 : 2;
    }
    this.hayEmpate = !this.casillas.some(
      (i) => this.casilla(i).innerHTML == ''
    );
  }

  verificarLinea() {
    let hayLineaGanadora = false;
    this.lineas.forEach((linea) => {
      const aHTML = document.getElementById(linea[0].toString()).innerHTML;
      const bHTML = document.getElementById(linea[1].toString()).innerHTML;
      const cHTML = document.getElementById(linea[2].toString()).innerHTML;

      if (aHTML !== '' && aHTML == bHTML && bHTML == cHTML) {
        hayLineaGanadora = true;
      }
    });
    return hayLineaGanadora;
  }

  reiniciar() {
    this.primeraJugada = false;

    this.hayGanador = false;
    this.hayEmpate = false;
    this.isPlayerOne = true;
    for (let i = 0; i < 9; i++) {
      document.getElementById(i.toString()).innerHTML = '';
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
