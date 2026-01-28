import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './RoulettePage/player-list/player-list.component';
import { newUserPage } from './NewUSer/newUser.component';
import { SavedGroupComponent } from './saved-group/saved-group.component';
import { ConsentGuard } from './ConsentGuard';


const routes: Routes = [
  { path: 'roulette', component: PlayerListComponent, title: "SpecRoulette - Roulette Page"},
  { path: 'newUser', component: newUserPage, title: "SpecRoulette - New User Page"},
  { path: 'savedGroups', component: SavedGroupComponent, canActivate: [ConsentGuard], title: "SpecRoulette - Saved Groups Page"},
  { path: '', redirectTo: "/newUser", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
