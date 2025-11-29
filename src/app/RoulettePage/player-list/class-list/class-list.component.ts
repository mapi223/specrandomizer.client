import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IClassDetails } from './classDetails';
import { CLASSLIST } from './mock-list';
import { IAppState } from 'src/app/Store/RouletteReducers';
import { Store } from '@ngrx/store';
import { selectPlayerSpecs } from 'src/app/Store/RouletteSelectors';
import { map } from 'rxjs';
import { updatePlayerSpecs } from 'src/app/Store/RouletteActions';


@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent {
  @Input() isLoading = false;
  @Input() PlayerId!: number;
  classes = CLASSLIST;
  selectedClasses: IClassDetails[] = [];
  currentIndex: number | null = null; 
  rouletteInterval: any = null; 
  isCycling: boolean = false;

  @Input() passedSelected: number[] = [];
  @Output() selectionOutput = new EventEmitter<IClassDetails[]>();

  constructor(private store: Store<IAppState>, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.passedSelected && this.passedSelected.length) {
      this.selectedClasses = this.classes.filter(c => this.passedSelected.includes(c.id));
      this.cdr.detectChanges();
    }
  }

  onSelect(classDetails: IClassDetails): void {
    const foundIndex = this.selectedClasses.findIndex(c => c.id === classDetails.id);
    
    if (foundIndex === -1) {
      this.selectedClasses.push(classDetails);
    } else {
      this.selectedClasses.splice(foundIndex, 1);
    }
    const selectedIds = this.selectedClasses.map(classItem => classItem.id);

    if(selectedIds !== this.passedSelected) {
      this.store.dispatch(updatePlayerSpecs({ playerId: this.PlayerId, newSpecList: selectedIds }));
    }
}

  isSelected(classDetails: IClassDetails): import('rxjs').Observable<boolean> {
    return this.store.select(selectPlayerSpecs, { playerId: this.PlayerId }).pipe(
      map((specIds: number[]) => specIds.includes(classDetails.id))
    );
  }

  rouletteStart() {
      if (this.rouletteInterval) {
        clearInterval(this.rouletteInterval); 
      }

      let index = 0;
    this.isCycling = true;
    this.rouletteInterval = setInterval(() => {
      this.currentIndex = this.classes.indexOf(this.selectedClasses[index]); 
      index = (index + 1) % this.selectedClasses.length; 
      }, 250); 
    }


  rouletteStop() {
    if (this.rouletteInterval) {
      clearInterval(this.rouletteInterval);
      this.rouletteInterval = null;
    }
    this.currentIndex = null;
    this.isCycling = false;
  }
}





