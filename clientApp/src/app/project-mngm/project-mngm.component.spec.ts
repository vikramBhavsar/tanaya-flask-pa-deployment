import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMngmComponent } from './project-mngm.component';

describe('ProjectMngmComponent', () => {
  let component: ProjectMngmComponent;
  let fixture: ComponentFixture<ProjectMngmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMngmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMngmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
