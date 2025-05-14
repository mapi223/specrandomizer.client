import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IClassDetails } from './classDetails';
import { CLASSLIST } from './mock-list';


@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent {
  @Input() isLoading = false;
  classes = CLASSLIST;
  selectedClasses: IClassDetails[] = [];
  currentIndex: number | null = null; 
  rouletteInterval: any = null; 
  isCycling: boolean = false;

  @Input() passedSelected: number[] = [];
  @Output() selectionOutput = new EventEmitter<IClassDetails[]>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      if (this.isLoading) {
        this.rouletteStart();
      } else {
        this.rouletteStop();
      }
    }
  }

  ngAfterViewInit() {
    if (this.passedSelected && this.passedSelected.length) {
      this.passedSelected.forEach(selectedId => {
        const classDetails = this.classes.find(c => c.id === selectedId);
        if (classDetails) {
          this.onSelect(classDetails);
        }
      });
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

    this.selectionOutput.emit([...this.selectedClasses]);
  }

  isSelected(classDetails: IClassDetails): boolean {
    return this.selectedClasses.some(c => c.id === classDetails.id);
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





