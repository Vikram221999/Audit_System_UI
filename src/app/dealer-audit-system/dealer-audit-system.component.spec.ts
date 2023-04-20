import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAuditSystemComponent } from './dealer-audit-system.component';

describe('DealerAuditSystemComponent', () => {
  let component: DealerAuditSystemComponent;
  let fixture: ComponentFixture<DealerAuditSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerAuditSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerAuditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
