import { Component } from '@angular/core';
import { IAppState } from '../Store/RouletteReducers';
import { select, Store } from '@ngrx/store';
import { selectSavedGroups } from '../Store/RouletteSelectors';
import { loadConfigurationHistory, loadRouletteFromHistory } from '../Store/RouletteActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-group',
  templateUrl: './saved-group.component.html',
  styleUrls: ['./saved-group.component.css']
})
export class SavedGroupComponent {
constructor(private store: Store<IAppState>, private router: Router) { }
groups$ = this.store.select(selectSavedGroups);

ngOnInit() {
this.store.dispatch(loadConfigurationHistory());
}

loadGroup(i: number){
  this.store.dispatch(loadRouletteFromHistory({ groupId: i }));
  this.router.navigate(['/roulette']);
}
}