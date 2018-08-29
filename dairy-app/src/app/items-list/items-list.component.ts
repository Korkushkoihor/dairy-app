import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../service/items.service';
import { TaskModel } from '../models/TaskModel';
import { Subscription } from 'rxjs';
import { CommentsService } from '../service/comments.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  public taskArray: TaskModel[] = [];
  public updateTaskSubscription: Subscription = new Subscription();

  constructor(private itemsService: ItemsService,
              private commentService: CommentsService) {
  }

  ngOnInit() {
    this.updateTaskSubscription = this.itemsService.updateTaskList.subscribe((array: TaskModel[]) => {
      this.taskArray = array;
    });
  }

  public addTask(_input) {
    if (this.itemsService.addTask(_input.value)) {
      _input.value = '';
    }
  }

  public removeTask(_task: TaskModel) {
    this.itemsService.removeTask(_task);
    if (_task.isSelected) {
      this.commentService.hideComments();
    }
  }

  public selectTask(_task: TaskModel) {
    this.commentService.updateSelectedTask(_task);
  }

  ngOnDestroy() {
    this.updateTaskSubscription.unsubscribe();
  }

}
