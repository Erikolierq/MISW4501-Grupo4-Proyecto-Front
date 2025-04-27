import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanCreateComponent } from './salesman-create.component';

describe('SalesmanCreateComponent', () => {
  let component: SalesmanCreateComponent;
  let fixture: ComponentFixture<SalesmanCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesmanCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
