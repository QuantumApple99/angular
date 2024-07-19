import { Component, input, Input, Output, EventEmitter, inject } from '@angular/core';
import { UiComponent } from '../ui/ui.component';
import { DatePipe } from '@angular/common';
import { TasksService } from '../task.service';

@Component({
  selector: 'tasks-task',
  standalone: true,
  imports: [UiComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  private tService = inject(TasksService);

  @Input() usertask !: {
    id: string
    userId: string
    summary: string
    dueDate: string
    title: string
  }

  onclick(){
    this.tService.removeTask(this.usertask.id);
  }
}
