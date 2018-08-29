import { Component, ElementRef, HostListener, OnChanges, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from '../models/TaskModel';
import { Subscription } from 'rxjs';
import { CommentsService } from '../service/comments.service';
import { ItemsService } from '../service/items.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit, OnChanges {
  @ViewChild('commentText') commentText: ElementRef;
  public activeTask: TaskModel;
  public selectTaskSubscription: Subscription = new Subscription();
  public isSelectedTask: boolean = false;

  constructor(private commentService: CommentsService,
              private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.selectTaskSubscription = this.commentService.selectTaskSubscription.subscribe((_task) => {
      this.activeTask = _task;
      this.isSelectedTask = _task.isSelected;
    });

    this.activeTask = this.itemsService.getActiveTask();
    this.isSelectedTask = this.activeTask && this.activeTask.isSelected ? true : false;
  }

  ngOnChanges() {
    this.selectTaskSubscription.unsubscribe();
  }

  public addComment(_value) {
    this.commentService.addComment(this.activeTask, _value);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 13) {
      if (this.commentText.nativeElement.value)
        this.addComment(this.commentText.nativeElement.value);
      this.commentText.nativeElement.value = '';
    }
  }

}
