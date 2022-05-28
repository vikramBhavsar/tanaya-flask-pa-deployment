import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMngmComponent } from './blog-mngm.component';

describe('BlogMngmComponent', () => {
  let component: BlogMngmComponent;
  let fixture: ComponentFixture<BlogMngmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogMngmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMngmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
