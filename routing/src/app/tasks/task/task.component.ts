import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() remove = new EventEmitter();
  private tasksService = inject(TasksService);

  onComplete() {
    this.tasksService.removeTask(this.task.id);
    this.remove.emit();
  }
}
