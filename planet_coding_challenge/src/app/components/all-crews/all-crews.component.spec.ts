import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCrewsComponent } from './all-crews.component';

describe('AllCrewsComponent', () => {
  let component: AllCrewsComponent;
  let fixture: ComponentFixture<AllCrewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCrewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCrewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
