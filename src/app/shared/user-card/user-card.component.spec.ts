import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly handle input for user', () => {
    const testUser: User = {
      login: 'testUser',
      id: 0,
      node_id: '',
      avatar_url: '',
      gravatar_id: '',
      url: '',
      html_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: '',
      site_admin: false,
      name: '',
      company: '',
      blog: '',
      location: '',
      email: '',
      hireable: false,
      bio: '',
      twitter_username: '',
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: '',
      updated_at: '',
      private_gists: 0,
      total_private_repos: 0,
      owned_private_repos: 0,
      disk_usage: 0,
      collaborators: 0,
      two_factor_authentication: false,
      plan: {
        name: '',
        space: 0,
        private_repos: 0,
        collaborators: 0
      }
    };
    component.user = testUser;
    fixture.detectChanges();

    expect(component.user).toBe(testUser);
  });
});
