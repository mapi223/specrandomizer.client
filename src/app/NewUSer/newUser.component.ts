import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { IAppState } from '../Store/RouletteReducers';
import { Store } from '@ngrx/store';





@Component({
  selector: 'app-newUser',
  templateUrl: './newUser.component.html',
  styleUrls: ['./newUser.component.css']
})
export class newUserPage  {
  constructor(@Inject(Store) private store: Store<IAppState>) {
  }
  }
