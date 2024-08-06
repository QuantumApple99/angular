import { Injectable } from '@angular/core';
import { taksstatus, taskformat } from './taskformat';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks : taskformat[] = [];

  onAddTask(task: taskformat){
    this.tasks.push(task);
    console.log(this.tasks);
  }

  onChangeStatus(taskId: string, status: taksstatus){
    var i:number;
    for(i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].id === taskId){
        this.tasks[i].status = status
      }
    }
  }
}
