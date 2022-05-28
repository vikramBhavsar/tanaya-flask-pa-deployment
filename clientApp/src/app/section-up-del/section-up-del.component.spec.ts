import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUpDelComponent } from './section-up-del.component';

describe('SectionUpDelComponent', () => {
  let component: SectionUpDelComponent;
  let fixture: ComponentFixture<SectionUpDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionUpDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUpDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
