import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './RoulettePage/player-list/player-list.component';
import { newUserPage } from './NewUSer/newUser.component';

const routes: Routes = [
  { path: 'roulette', component: PlayerListComponent, title: "SpecRoulette - Roulette Page"},
  { path: 'newUser', component: newUserPage, title: "SpecRoulette - New User Page"},
  { path: '', redirectTo: "/roulette", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
