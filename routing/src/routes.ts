import { CanMatch, CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./app/tasks/no-task/no-task.component";
import { UserTasksComponent } from "./app/users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./app/tasks/new-task/new-task.component";
import { TasksComponent } from "./app/tasks/tasks.component";
import { NotfoundComponent } from "./app/notfound/notfound.component";
import { inject } from "@angular/core";

const dummyGuard: CanMatchFn = (router, segment) => {
    const routed = inject(Router);
    const getAccess = Math.random()
    if(getAccess < 0.5){
        return true
    }
    else{
        return new RedirectCommand(routed.parseUrl('/unauthorized'))
    }
}

export const routes: Routes = [
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        canMatch: [dummyGuard],
        children: [
            {
                path: '',
                redirectTo: 'tasks/displaytasks',
                pathMatch: 'prefix'
            },
            {
                path: 'tasks/displaytasks',
                component: TasksComponent
            },
            {
                path: 'tasks/addtask',
                component: NewTaskComponent
            }
        ]
    },
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }
]