import { Injectable } from '@angular/core';
import { TaskModel } from '../models/TaskModel';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from '../models/CommentModel';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public updateTaskList = new BehaviorSubject<TaskModel[]>(this.taskArray);

  private _taskArray: TaskModel[] = [];

  get taskArray(): TaskModel[] {
    return this.getTasksListFromLocalStorage();
  }

  constructor() {
  }

  public addTask(_taskName: string): boolean {
    if (_taskName) {
      for (let i = 0; i < this._taskArray.length; i++) {
        if (_taskName === this._taskArray[i].taskName) {
          return false;
        }
      }
      this._taskArray = this.getTasksListFromLocalStorage();
      if (!this._taskArray) {
        this._taskArray = [];
      }
      this._taskArray.push(new TaskModel(_taskName, 0));
      this.updateLocalStorage();
      return true;
    }
  }

  public removeTask(_task: TaskModel) {
    for (let i = 0; i < this._taskArray.length; i++) {
      if (_task.taskName === this._taskArray[i].taskName) {
        this._taskArray.splice(i, 1);
      }
    }
    this.updateLocalStorage();
  }

  public addCommentToTask(_task: TaskModel, _comment: CommentModel) {
    for (let i = 0; i < this._taskArray.length; i++) {
      if (_task.taskName === this._taskArray[i].taskName) {
        this._taskArray[i].comments.push(_comment);
      }
    }
    this.updateLocalStorage();
  }

  public getActiveTask(): TaskModel {
    this._taskArray = this.getTasksListFromLocalStorage();
    if (!this._taskArray) {
      this._taskArray = [];
    }
    for (let i = 0; i < this._taskArray.length; i++) {
      if (this._taskArray[i].isSelected) {
        return this._taskArray[i];
      }
    }
    return null;
  }

  public updateLocalStorage(_tasks?: TaskModel[]) {
    if (_tasks) {
      this._taskArray = _tasks;
    }
    this.updateTaskList.next(this._taskArray);
    localStorage.setItem('tasks-list', JSON.stringify(this._taskArray));
  }

  private getTasksListFromLocalStorage(): TaskModel[] {
    return JSON.parse(localStorage.getItem('tasks-list'));
  }

}
