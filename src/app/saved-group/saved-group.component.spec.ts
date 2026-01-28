import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGroupComponent } from './saved-group.component';

describe('SavedGroupComponent', () => {
  let component: SavedGroupComponent;
  let fixture: ComponentFixture<SavedGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedGroupComponent]
    });
    fixture = TestBed.createComponent(SavedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
