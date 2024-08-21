import { Component, computed, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { type User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: User

  get imagePath() {
    return 'users/' + this.user.avatar;
  } 
}
