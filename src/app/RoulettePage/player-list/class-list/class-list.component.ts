import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IClassDetails } from './classDetails';
import { CLASSLIST } from './mock-list';
import { IAppState } from 'src/app/Store/RouletteReducers';
import { Store } from '@ngrx/store';
import { selectPlayerClasses, selectPlayerSpecs } from 'src/app/Store/RouletteSelectors';
import { map, take } from 'rxjs';
import { updatePlayerClasses, updatePlayerSpecs } from 'src/app/Store/RouletteActions';
import { IClass } from '../player/player.model';


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
  specList$ = this.store.select(selectPlayerSpecs, { playerId: this.PlayerId });
  classList$ = this.store.select(selectPlayerClasses, { playerId: this.PlayerId });

  @Input() passedSelected: IClass[] = [];
  @Output() selectionOutput = new EventEmitter<IClassDetails[]>();

  constructor(private store: Store<IAppState>, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.classList$ = this.store.select(selectPlayerClasses, { playerId: this.PlayerId });
    this.specList$ = this.store.select(selectPlayerSpecs, { playerId: this.PlayerId });
  }


  ngAfterViewInit() {
    if (this.passedSelected && this.passedSelected.length) {
      this.selectedClasses = this.classes.filter(c => this.passedSelected.findIndex(Iclasses => Iclasses.id === c.id) !== -1);
      this.cdr.detectChanges();
    }
  }

  onSelect(classDetails: IClassDetails): void {
    this.classList$.pipe(take(1)).subscribe(classIds => {
      const list = classIds ? [...classIds] : [];
      let updatedClasses: IClass[] = []
      if (list.find(clas => clas.id === classDetails.id)) {
        updatedClasses = list.filter(clas => clas.id !== classDetails.id)
      } else {
        const udatedVal: IClass = { id: classDetails.id, className: classDetails.className, activeSpecs: classDetails.specs.list };
        updatedClasses = [...list, udatedVal];
      }
      console.log("Updated Classes:", updatedClasses, "for PlayerId:", this.PlayerId);
      this.store.dispatch(updatePlayerClasses({ playerId: this.PlayerId, newClassList: updatedClasses }));
      this.selectedClasses = this.classes.filter(c => updatedClasses.findIndex(uc => uc.id === c.id) !== -1);
    });
  }

  onSpecSelect(classDetail: IClassDetails, spec: string): void {
    this.classList$.pipe(take(1)).subscribe(clas => {
      const list = clas ? [...clas] : [];
      const specLongName: string = classDetail.specs.list[classDetail.specs.shortName.indexOf(spec)];
      const updatedClasses = list.filter(c => c.activeSpecs.includes(specLongName))
      const specsForClass = list.find(c => c.id === classDetail.id)?.activeSpecs || [];
      let updatedSpecs: string[] = [];
      if (specsForClass.includes(specLongName)) {
        updatedSpecs = specsForClass.filter(s => s !== specLongName);
      } else {
        updatedSpecs = [...specsForClass, specLongName];
      }


      this.store.dispatch(updatePlayerSpecs({ playerId: this.PlayerId, newSpecList: updatedSpecs, classId: classDetail.id }));

    }
    );
  }

  isClassSelected(classDetails: IClassDetails): import('rxjs').Observable < boolean > {
    return this.store.select(selectPlayerClasses, { playerId: this.PlayerId }).pipe(
      map((classes: IClass[]) => {
        let isSelect = false;
        if (classes === undefined) {
          return false;
        }
        classes.forEach(clas => {
          if (clas.id === classDetails.id) {
            isSelect = true;
          }
        });
        return isSelect;
      })
    );
  }

  isSpecSelected(spec: string, classDets: IClassDetails): import('rxjs').Observable < boolean > {
    return this.store.select(selectPlayerClasses, { playerId: this.PlayerId }).pipe(
      map((specs: IClass[] | undefined) => {
        let isSelect = false;
        if (specs === undefined) {
          return false;
        }
        const specLongName: string = classDets.specs.list[classDets.specs.shortName.indexOf(spec)];

        specs.forEach(clas => {
          if (clas.activeSpecs.includes(specLongName) && clas.id === classDets.id) {
            isSelect = true;
            console.log("Spec found:", clas);
            return isSelect;
          }
          else {
            return isSelect;
          }
        }); return isSelect;
      }));
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





