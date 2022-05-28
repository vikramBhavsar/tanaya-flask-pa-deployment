import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtEducationComponent } from './art-education.component';

describe('ArtEducationComponent', () => {
  let component: ArtEducationComponent;
  let fixture: ComponentFixture<ArtEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
