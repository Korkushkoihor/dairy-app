import { CommentModel } from './CommentModel';

export class TaskModel {
  taskName: string;
  isSelected: boolean;
  comments: CommentModel[];

  constructor(_taskName: string, _commentsCount?: number) {
    this.taskName = _taskName;
    this.isSelected = false;
    this.comments = [];
  }
}
