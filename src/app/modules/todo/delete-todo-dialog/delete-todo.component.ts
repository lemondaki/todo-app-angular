import { Component, OnInit, OnDestroy } from '@angular/core';
import { todoService } from 'src/app/shared/service/todo.service';
import { apiService } from 'src/app/shared/service/api.service';
import { toastService } from 'src/app/shared/service/toast.service';
import { ITodo } from '../../../shared/interfaces/interface';
import { switchMap, Subscription } from 'rxjs';
@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss'],
})
export class DeleteTodoComponent implements OnInit, OnDestroy {
  titleAction: string = '';
  deleteTodoInfor: ITodo = { id: 0, task: '', deadline: '', isCompleted: false };
  subscriptions: Subscription[] = [];
  constructor(
    private todoService: todoService,
    private http: apiService,
    private toastService: toastService
  ) {}

  handleCloseDialog() {
    this.todoService.isShowDialogDelete.next(false);
  }

  handleDeleteTodo() {
    this.todoService.isShowDialogDelete.next(false);
    this.http
      .deleteTodo(this.deleteTodoInfor.id)
      .pipe(switchMap(() => this.http.getTodos()))
      .subscribe({
        next: (data) => {
          this.toastService.showSuccess('Delete todo successfully!', 2000);
          this.todoService.getAllTodos(data);
        },
        error: () => {
          this.toastService.showErrors('Delete todo failure!', 2000);
        },
      });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.todoService.titleAction.subscribe((title) => {
        this.titleAction = title;
      })
    );
    this.subscriptions.push(
      this.todoService.deleteTodoItem.subscribe((todo) => {
        this.deleteTodoInfor = { ...todo };
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
