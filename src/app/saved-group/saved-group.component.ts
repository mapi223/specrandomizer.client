import { Component } from '@angular/core';
import { IAppState } from '../Store/RouletteReducers';
import { select, Store } from '@ngrx/store';
import { selectSavedGroups } from '../Store/RouletteSelectors';
import { loadConfigurationHistory } from '../Store/RouletteActions';

@Component({
  selector: 'app-saved-group',
  templateUrl: './saved-group.component.html',
  styleUrls: ['./saved-group.component.css']
})
export class SavedGroupComponent {
constructor(private store: Store<IAppState>) { }
groups$ = this.store.select(selectSavedGroups);

ngOnInit() {
this.store.dispatch(loadConfigurationHistory());
}


}