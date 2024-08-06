import { InjectionToken, Provider } from "@angular/core"

export interface taskformat{
    id: string,
    title: string,
    description: string,
    status: 'done' | 'in-progress' | 'open' 
}

export type taksstatus =  'open' | 'done' | 'in-progress'

export type statusObject =  {
    value: string,
    text: string,
    status: taksstatus
}[];

export const statusData: statusObject = [
    {
        value: 'open',
        text: 'Open',
        status: 'open'
    },
    {
        value: 'in-progress',
        text: 'In Progress',
        status: 'in-progress'
    },
    {
        value: 'done',
        text: 'Completed',
        status: 'done'
    }
]

export const customToken = new InjectionToken<statusObject>('token');

export const newProvider : Provider = {
    provide: customToken,
    useValue: statusData
}