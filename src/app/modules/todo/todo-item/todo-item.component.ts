import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from '../../../shared/interfaces/interface';
import { todoService } from 'src/app/shared/service/todo.service';
import { apiService } from 'src/app/shared/service/api.service';
import { toastService } from 'src/app/shared/service/toast.service';
import { ELabelTodoStatus } from '../../../shared/enum/enum';
import { ETimeUnit } from '../../../shared/enum/enum';
import { EAction } from '../../../shared/enum/enum';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  constructor(
    private todoService: todoService,
    private http: apiService,
    private toastService: toastService
  ) {}
  @Input() todo: ITodo = {
    id: 0,
    task: '',
    deadline: '',
    isCompleted: false,
  };
  @Output() toggleTodo = new EventEmitter();
  LabelTodoStatus = ELabelTodoStatus;
  labelStatus: string = '';

  handleToggleTodo(event: ITodo) {
    const toggleTodo = { ...event, isCompleted: !event.isCompleted };
    this.http
      .editTodo(toggleTodo)
      .pipe(switchMap(() => this.http.getTodos()))
      .subscribe({
        next: (data) => {
          this.todoService.getAllTodos(data);
        },
        error: () => {
          this.toastService.showErrors('There are something errors!', 2000);
        },
      });
  }

  onClickEditButton(todo: ITodo) {
    this.todoService.getTitleAction(EAction.EDIT);
    this.todoService.isShowDialogCreateEdit.next(true);
    this.todoService.editTodoItem.next(todo);
  }

  onClickDeleteButton(todo: ITodo) {
    this.todoService.getTitleAction(EAction.DELETE);
    this.todoService.isShowDialogDelete.next(true);
    this.todoService.deleteTodoItem.next(todo);
  }

  onClickToggleButton(todo: ITodo) {
    this.toggleTodo.emit(todo);
  }

  handleCheckDeadline(todo: ITodo) {
    const currentTime = Date.now();
    const deadlineTime = new Date(todo.deadline).getTime();
    const oneHourDeadline = ETimeUnit.HOUR;
    if (deadlineTime - currentTime < 0 && todo.isCompleted === false) {
      this.labelStatus = ELabelTodoStatus.LATE;
    } else if (
      deadlineTime - currentTime <= oneHourDeadline &&
      todo.isCompleted === false
    ) {
      this.labelStatus = ELabelTodoStatus.NEAR;
    } else if (todo.isCompleted === false) {
      this.labelStatus = ELabelTodoStatus.FAR;
    }
    return this.labelStatus;
  }
}
