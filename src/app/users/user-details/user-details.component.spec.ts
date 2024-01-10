import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';
import { loadFollowers, loadRepositories } from 'src/app/core/store/github.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/core/models/user';
import { loadUser } from '../state/user.acctions';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: Store;
  let router: Router;
  let route: ActivatedRoute;
  let toastService: ToastService;
  let paramMapSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    paramMapSubject = new BehaviorSubject({
      get: () => 'testuser'
    });

    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [StoreModule.forRoot({}), BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMapSubject.asObservable() },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate'), routeReuseStrategy: { shouldReuseRoute: () => false } },
        },
        {
          provide: ToastService,
          useValue: { error: jasmine.createSpy('error') },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    toastService = TestBed.inject(ToastService);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should dispatch actions to load user, followers and repositories on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadUser({ username: 'testuser' }));
    expect(store.dispatch).toHaveBeenCalledWith(loadFollowers({ username: 'testuser' }));
    // expect(store.dispatch).toHaveBeenCalledWith(loadRepositories({ username: 'testuser' }));
  });

  it('should unsubscribe from routeParamSubscription on destroy', () => {
    const spy = spyOn((component as any).routeParamSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to user details page on showUserDetails call', () => {
    const user: User = { login: 'testuser2' } as User;
    component.showUserDetails(user);
    expect(router.navigate).toHaveBeenCalledWith(['user/', user.login]);
  });

  it('should show error toast when username is not found in route params', () => {
    paramMapSubject.next({ get: (key: string) => null });
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(toastService.error).toHaveBeenCalledWith('Error loading user');
    });
  });
});
