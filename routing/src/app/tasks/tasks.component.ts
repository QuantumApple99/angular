import { Component, computed, inject, Input, OnChanges } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})

export class TasksComponent{
  @Input() userId !: string
  @Input() order !: 'asc' | 'desc'
  tasksService = inject(TasksService)
  activatedRoute = inject(ActivatedRoute)

  userTasks: Task[] = [];
 
  constructor(){
    this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        const id = paramMap.get('userId')
        this.userTasks = this.tasksService.tasks.filter((task) => task.userId === id)
        .sort((a, b) => {
          if(this.order === 'desc'){
            return a.id > b.id ? -1 : 1;
          }
          else{
            return a.id > b.id ? 1 : -1;
          }
        })
      }
    })
  }

  onRemove(){
    this.userTasks = this.tasksService.tasks.filter((task) => task.userId === this.userId)
  }

}
