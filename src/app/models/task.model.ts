import { User } from "./user.model";

export interface Task {
    taskId: number;  
    nombre: string;
    descripcion: string;
    completado: boolean;
    userId: number; 
    user: User
  }
  