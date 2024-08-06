import { Component, inject } from '@angular/core';
import { customToken, newProvider, taskformat } from '../../taskformat';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [newProvider]
})
export class TasksListComponent {
  private taskService = inject(TasksService);
  tasks: taskformat[] = this.taskService.tasks;
  statusOptions = inject(customToken);

  onChangeTasksFilter(filter: string) {
    this.tasks = this.taskService.tasks;

    if(filter==='done'){
      this.tasks = this.tasks.filter((task)=>task.status==='done');
    }

    if(filter==='open'){
      this.tasks = this.tasks.filter((task)=>task.status==='open');
    }

    if(filter==='in-progress'){
      this.tasks = this.tasks.filter((task)=>task.status==='in-progress');
    }

    else{
      this.tasks = this.tasks;
    }
  }
}
