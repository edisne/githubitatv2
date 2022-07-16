import { Tag } from "src/app/todo/todo-form/todo-form.component";

export class Todo{
    
    constructor(
                public id?:string,
                public title:string ='', 
                public date:Date = new Date,
                public description:string = '',
                public project:string = '',
                public tags:Tag[] = [],
                ){}
}