import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form } from '../app/formtype';
import { TasksService } from '../task.service';

@Component({
  selector: 'tasks-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})

export class NewTaskComponent {
  @Input() userId!: string;
  @Output() closeCreate = new EventEmitter();

  submittedTitle: string = "";
  submittedDate: string = "";
  submittedSummary: string = ""; 

  taskService = inject(TasksService);

  close(){
    this.closeCreate.emit();
  }

  create(){
   this.taskService.createTask({
      title: this.submittedTitle,
      summary: this.submittedSummary,
      dueDate: this.submittedDate   
    }, this.userId);

    this.closeCreate.emit();
  }
}
