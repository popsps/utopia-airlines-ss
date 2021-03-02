import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDownloadComponent } from './users-download.component';

describe('UsersDownloadComponent', () => {
  let component: UsersDownloadComponent;
  let fixture: ComponentFixture<UsersDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
