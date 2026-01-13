import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassListComponent } from './RoulettePage/player-list/class-list/class-list.component';
import { PlayerListComponent } from './RoulettePage/player-list/player-list.component';
import { PlayerComponent } from './RoulettePage/player-list/player/player.component';
import { SpecRouletteHeaderComponent } from './spec-roulette-header/spec-roulette-header.component';
import { GroupConfigurationComponent } from './RoulettePage/player-list//group-configuration/group-configuration.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rouletteReducer } from './Store/RouletteReducers';
import { EffectsModule } from '@ngrx/effects';
import { RouletteEffects } from './Store/RouletteEffects';
import { SavedGroupComponent } from './saved-group/saved-group.component';



@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    PlayerListComponent,
    PlayerComponent,
    SpecRouletteHeaderComponent,
    GroupConfigurationComponent,
    SavedGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ roulette: rouletteReducer }),
    EffectsModule.forRoot([RouletteEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Spec Roulette',
      maxAge: 25,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 static UserApi: String = 'https://localhost:7283';
 static GroupApi: String = 'https://localhost:7234';
 static ConfigApi: String = 'https://localhost:7006';
 static AdminApi: String = 'https://localhost:7264';
}
