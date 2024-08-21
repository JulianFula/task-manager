import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Task } from '../models/task.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksRequest } from '../models/taskRequest.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder, private authService: AuthService) {
    this.taskForm = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addTask(): void {

    const taskRequest: TasksRequest = {
      nombre: this.taskForm.value.name,
      descripcion: this.taskForm.value.description,
      completado: false,
      taskId: 0
    };


    this.taskService.createTask(taskRequest).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset();
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleTaskCompletion(task: Task): void {
    const taskRequest: TasksRequest = {
      nombre: task.nombre,
      descripcion: task.descripcion,
      completado: !task.completado,
      taskId: task.taskId
    };
    this.taskService.updateTask(taskRequest).subscribe(() => {
      this.loadTasks();
    });
  }
}
