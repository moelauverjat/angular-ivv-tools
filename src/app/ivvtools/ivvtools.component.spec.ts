import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvvtoolsComponent } from './ivvtools.component';

describe('IvvtoolsComponent', () => {
  let component: IvvtoolsComponent;
  let fixture: ComponentFixture<IvvtoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvvtoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvvtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
