import { Component, input, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { form } from '../app/formtype';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input() username:string | undefined ;
  @Input({required: true}) userid!:string;

  constructor(private tService: TasksService){}

  isAddingTask: boolean = false;

  closeOption(){
    this.isAddingTask = false;
  }

  get selectedUserTasks(){
    return this.tService.getUserTasks(this.userid);
  }

  onclick(){
    this.isAddingTask = true;
  }
}
