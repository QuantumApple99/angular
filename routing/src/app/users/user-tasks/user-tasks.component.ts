import { Component, DestroyRef, inject, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  @Input({ required: true }) userId !: string;
  private userService = inject(UsersService)

  name = ''

  get userName(){
    return this.userService.users.find(user => user.id === this.userId)?.name
  }

}
