import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from "../user/user.component";
import { TasksComponent } from '../tasks/tasks.component';
import { DUMMY_USERS } from '../users';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
  users = DUMMY_USERS;
  selectedid !:string;

  get pushusername(){
    return this.users.find((user)=>user.id===this.selectedid)
  }

  onselect(id: string){
    this.selectedid = id; 
  }
}
