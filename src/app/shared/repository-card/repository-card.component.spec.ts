import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryCardComponent } from './repository-card.component';
import { GitHubRepository } from 'src/app/core/models/repository';

describe('RepositoryCardComponent', () => {
  let component: RepositoryCardComponent;
  let fixture: ComponentFixture<RepositoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly handle input for repository', () => {
    const testRepo: GitHubRepository = {
      id: 0,
      node_id: '',
      name: '',
      full_name: '',
      private: false,
      owner: {
        login: '',
        id: 0,
        node_id: '',
        avatar_url: '',
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
        site_admin: false
      },
      html_url: '',
      description: null,
      fork: false,
      url: '',
      forks_url: '',
      keys_url: '',
      collaborators_url: '',
      teams_url: '',
      hooks_url: '',
      issue_events_url: '',
      events_url: '',
      assignees_url: '',
      branches_url: '',
      tags_url: '',
      blobs_url: '',
      git_tags_url: '',
      git_refs_url: '',
      trees_url: '',
      statuses_url: '',
      languages_url: '',
      stargazers_url: '',
      contributors_url: '',
      subscribers_url: '',
      subscription_url: '',
      commits_url: '',
      git_commits_url: '',
      comments_url: '',
      issue_comment_url: '',
      contents_url: '',
      compare_url: '',
      merges_url: '',
      archive_url: '',
      downloads_url: '',
      issues_url: '',
      pulls_url: '',
      milestones_url: '',
      notifications_url: '',
      labels_url: '',
      releases_url: '',
      deployments_url: '',
      created_at: '',
      updated_at: '',
      pushed_at: '',
      git_url: '',
      ssh_url: '',
      clone_url: '',
      svn_url: '',
      homepage: null,
      size: 0,
      stargazers_count: 0,
      watchers_count: 0,
      language: '',
      has_issues: false,
      has_projects: false,
      has_downloads: false,
      has_wiki: false,
      has_pages: false,
      has_discussions: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      allow_forking: false,
      is_template: false,
      web_commit_signoff_required: false,
      topics: [],
      visibility: '',
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: ''
    };
    component.repository = testRepo;
    fixture.detectChanges();
    expect(component.repository).toBe(testRepo);
  });
});
