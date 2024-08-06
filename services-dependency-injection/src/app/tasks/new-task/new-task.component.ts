import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../tasks.service';
import { taskformat } from '../../taskformat';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @ViewChild('form') formEl ?: ElementRef<HTMLFormElement>;

  private taskService = inject(TasksService);

  onAddTask(title: string, description: string) {
    this.formEl?.nativeElement.reset();
    
    var newTask: taskformat = {
      id: Math.random().toString(),
      title: title,
      description: description,
      status: 'open'
    }
    this.taskService.onAddTask(newTask)
  }
}
