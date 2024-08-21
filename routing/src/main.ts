import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './routes';

bootstrapApplication(AppComponent, 
    {providers: [provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))]}
).catch((err) => console.error(err));
