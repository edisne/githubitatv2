import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { GitHubRepository } from '../models/repository';

/**
 * Generate code coverage using comand `ng test --no-watch --code-coverage`
 * CLI needs to be installe globaly
 * This creates a new folder with report, opening index.html we can see coverage report
 */

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // verifies that only api request we specified and requested are actually called


  it('should call the correct URL to search users', () => {
    const mockResponse: User[] = [];
    const username = 'testuser';

    service.searchUsers(username).subscribe(users => {
      expect(users).toEqual(mockResponse);
    })
    // fakeAsync() - wrapping this function above could simulate asny
    // tick(2500) - making test callback to be treated sync (so like time passed)
    // flush() - if we don't know how long should we be waiting, 
    //           if there are any task waiting go and fast forward the clock until those
    //           waiting task have been executed


    const req = httpMock.expectOne(`${environment.baseUrl}/search/users?q=${username}`); //what URL are we expecting to be called
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); //flush let us deside what data gets send back when the call is made
  })

  it('should call the correct URL to get users', () => {
    const mockResponse: User[] = [];
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
    const mockUser: User = {
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

    service.getUserDetails(username).subscribe((user: User) => {
      expect(user).toEqual(mockUser);
      expect(user.login).toMatch('test');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch user repositories', () => {
    const username = 'testuser';
    const mockRepos: GitHubRepository[] = [];

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
