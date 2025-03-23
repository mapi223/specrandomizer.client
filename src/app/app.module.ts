import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassListComponent } from './class-list/class-list.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerComponent } from './player/player.component';
import { SpecRouletteHeaderComponent } from './spec-roulette-header/spec-roulette-header.component';
import { GroupConfigurationComponent } from './group-configuration/group-configuration.component';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    PlayerListComponent,
    PlayerComponent,
    SpecRouletteHeaderComponent,
    GroupConfigurationComponent,
    ConfigurationListComponent,
    LogInComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 static UserApi: String = 'https://3.15.228.101:8084';
 static GroupApi: String = 'https://3.15.228.101:8083';
 static ConfigApi: String = 'https://3.15.228.101:8081';
 static AdminApi: String = 'https://3.15.228.101:8080';
}
