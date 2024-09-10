import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeRoutingModule } from './tic-tac-toe/tic-tac-toe-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tic-tac-toe',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TicTacToeRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
