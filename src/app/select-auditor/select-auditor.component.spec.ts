import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAuditorComponent } from './select-auditor.component';

describe('SelectAuditorComponent', () => {
  let component: SelectAuditorComponent;
  let fixture: ComponentFixture<SelectAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAuditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
