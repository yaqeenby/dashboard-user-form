import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnsPlusComponent } from './table-columns-plus.component';

describe('TableColumnsPlusComponent', () => {
  let component: TableColumnsPlusComponent;
  let fixture: ComponentFixture<TableColumnsPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColumnsPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableColumnsPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
