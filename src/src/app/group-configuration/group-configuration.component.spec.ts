import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupConfigurationComponent } from './group-configuration.component';

describe('GroupConfigurationComponent', () => {
  let component: GroupConfigurationComponent;
  let fixture: ComponentFixture<GroupConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupConfigurationComponent]
    });
    fixture = TestBed.createComponent(GroupConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
