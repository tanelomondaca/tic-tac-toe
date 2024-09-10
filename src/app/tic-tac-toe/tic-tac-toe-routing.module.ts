import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { JuegoComponent } from './components/juego/juego.component';

const routes: Routes = [
  {
    path: 'tic-tac-toe',
    component: MainComponent,
    children: [
      { path: 'jugar', component: JuegoComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'jugar', pathMatch: 'full' },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicTacToeRoutingModule {}
