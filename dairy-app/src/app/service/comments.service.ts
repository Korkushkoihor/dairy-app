import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TaskModel } from '../models/TaskModel';
import { ItemsService } from './items.service';
import { CommentModel } from '../models/CommentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public selectTaskSubscription = new Subject<TaskModel>();

  constructor(private itemsService: ItemsService) {
  }

  public addComment(_task: TaskModel, _text: string) {
    this.itemsService.addCommentToTask(_task, new CommentModel(_text));
  }

  public updateSelectedTask(_task) {
    const taskArray = this.itemsService.taskArray;

    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].taskName === _task.taskName) {
        taskArray[i].isSelected = !taskArray[i].isSelected;
        this.selectTaskSubscription.next(taskArray[i]);
      } else {
        taskArray[i].isSelected = false;
      }
    }
    this.itemsService.updateLocalStorage(taskArray);
  }

  public hideComments() {
    this.selectTaskSubscription.next(new TaskModel(''));
  }
}
