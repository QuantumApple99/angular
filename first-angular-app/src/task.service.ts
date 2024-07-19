import { Injectable } from "@angular/core";
import { form } from "./app/formtype";

@Injectable({providedIn: 'root'})
export class TasksService {
    private dummyTasks = [
        {
          id: 't1',
          userId: 'u1',
          title: 'Master Angular',
          summary:'Learn all the basic and advanced features of Angular & how to apply them.',
          dueDate: '2025-12-31',
        },
        {
          id: 't2',
          userId: 'u3',
          title: 'Build first prototype',
          summary: 'Build a first prototype of the online shop website',
          dueDate: '2024-05-31',
        },
        {
          id: 't3',
          userId: 'u3',
          title: 'Prepare issue template',
          summary: 'Prepare and describe an issue template which will help with project management',
          dueDate: '2024-06-15',
        },
      ]

    constructor(){
      const tasklist = localStorage.getItem('tasks')

      if(tasklist){
        this.dummyTasks = JSON.parse(tasklist);
      }
    }

    getUserTasks(userid: string){
      return this.dummyTasks.filter((task)=>task.userId===(userid));
    }

    createTask(data: form, userid: string){
      this.dummyTasks.unshift({
        id: new Date().getTime().toString(),
        userId: userid,
        title: data.title,
        dueDate: data.dueDate,
        summary: data.summary
      });

      this.saveTask();
    }

    removeTask(id: string){
      this.dummyTasks = this.dummyTasks.filter((task) => task.id!=id)
      this.saveTask();
    }

    saveTask(){
      localStorage.setItem('tasks', JSON.stringify(this.dummyTasks));
    }
    
}