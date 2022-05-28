import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMngmComponent } from './section-mngm.component';

describe('SectionMngmComponent', () => {
  let component: SectionMngmComponent;
  let fixture: ComponentFixture<SectionMngmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionMngmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMngmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
