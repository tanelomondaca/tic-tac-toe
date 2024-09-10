import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { MainComponent } from './components/main/main.component';
import { JuegoComponent } from './components/juego/juego.component';


@NgModule({
  declarations: [
    MainComponent,
    JuegoComponent
  ],
  imports: [
    CommonModule,
    TicTacToeRoutingModule
  ]
})
export class TicTacToeModule { }
