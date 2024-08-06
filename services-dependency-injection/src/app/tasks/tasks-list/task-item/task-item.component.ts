import { Component, computed, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { customToken, newProvider, taksstatus, taskformat } from '../../../taskformat';
import { TasksService } from '../../../tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [newProvider]
})
export class TaskItemComponent {
  statusOptions = inject(customToken);

  private taskService = inject(TasksService);

  @Input({required: true}) task !: taskformat;

  get taskStatus(){
    switch (this.task.status) {
      case 'open':
        return 'Open';
      case 'in-progress':
        return 'Working on it';
      case 'done':
        return 'Completed';
      default:
        return 'Open';
    }
  }
  

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: taksstatus = 'open';

    switch (status) {
      case 'open':
        newStatus = 'open';
        break;
      case 'in-progress':
        newStatus = 'in-progress';
        break;
      case 'done':
        newStatus = 'done';
        break;
      default:
        break;
    }

    this.taskService.onChangeStatus(taskId, newStatus);
  }
}
