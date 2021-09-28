import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountsComponent } from './accounts.component';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt to load all accounts in database', () => {
    spy = spyOn(component, 'loadAllAccounts');
    component.loadAllAccounts();
    expect(spy).toHaveBeenCalled();
  });

  it('should attempt to load all account types in database', () => {
    spy = spyOn(component, 'loadAllAccountTypes');
    component.loadAllAccountTypes();
    expect(spy).toHaveBeenCalled();
  });

});
