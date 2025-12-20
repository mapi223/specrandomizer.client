import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecRouletteHeaderComponent } from './rouletteMachine.component';

describe('RouletteMachineComponent', () => {
  let component: SpecRouletteHeaderComponent;
  let fixture: ComponentFixture<SpecRouletteHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecRouletteHeaderComponent]
    });
    fixture = TestBed.createComponent(SpecRouletteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
