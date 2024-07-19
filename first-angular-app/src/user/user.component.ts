import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DUMMY_USERS } from '../users';
import { UiComponent } from '../ui/ui.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UiComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  @Input() user !: {
    id: string
    name: string
    avatar: String
  }

  @Input() isSelected!: boolean

  @Output() select = new EventEmitter();

  get image_path() {
    return '../assets/users/' + this.user.avatar;
  }

  onclick() {
    this.select.emit(this.user.id);
    // console.log(this.id);
  }
}
