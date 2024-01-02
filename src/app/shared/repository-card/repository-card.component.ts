import { Component, Input } from '@angular/core';
import { GitHubRepository } from 'src/app/core/models/repository';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent {

  @Input() repository: GitHubRepository | undefined;

}
