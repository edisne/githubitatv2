import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { GitHubRepository } from '../models/repository';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());


  it('should call the correct URL to search users', () => {
    const mockResponse : User[] = [];
    const username = 'testuser';

    service.searchUsers(username).subscribe(users => {
      expect(users).toEqual(mockResponse);
    })

    const req = httpMock.expectOne(`${environment.baseUrl}/search/users?q=${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  })

  it('should call the correct URL to get users', () => {
    const mockResponse : User[] = [];
    const pageSize = 10;
    const since = 100;
  
    service.getUsers(pageSize, since).subscribe(users => {
      expect(users).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${environment.baseUrl}/users?since=${since}&per_page=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch user details', () => {
    const username = 'testuser';
    const mockUser : User = {
      login: 'test',
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
  
    service.getUserDetails(username).subscribe((user:User) => {
      expect(user).toEqual(mockUser);
      expect(user.login).toMatch('test');
    });
  
    const req = httpMock.expectOne(`${environment.baseUrl}/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch user repositories', () => {
    const username = 'testuser';
    const mockRepos : GitHubRepository[] = [];
  
    service.getUserRepos(username).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });
  
    const req = httpMock.expectOne(`${environment.baseUrl}/users/${username}/repos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should fetch user followers', () => {
    const username = 'testuser';
    const mockFollowers: User[] = [];
  
    service.getUserFollowers(username).subscribe(followers => {
      expect(followers).toEqual(mockFollowers);
    });
  
    const req = httpMock.expectOne(`${environment.baseUrl}/users/${username}/followers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFollowers);
  });

});
