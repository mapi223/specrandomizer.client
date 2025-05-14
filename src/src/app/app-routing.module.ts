import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthenticationGuard } from './authentication.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'roulette', component: PlayerListComponent, title: "SpecRoulette - Roulette Page", canActivate: [AuthenticationGuard] },
  { path: 'configurationlistings', component: ConfigurationListComponent, title: "SpecRoulette - Group Listings Page" },
  { path: 'login', component: LogInComponent, title: "SpecRoulette - User Log In Page" },
  { path: 'admin', component: AdminComponent, title: "SpecRoulette - Admin Page" },
  { path: '', redirectTo: "/roulette", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
