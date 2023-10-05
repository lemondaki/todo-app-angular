import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from 'src/app/shared/interfaces/interface';
import { EFilterStatus } from 'src/app/shared/enum/enum';

@Injectable({
  providedIn: 'root',
})
export class todoService {
  public activeFilter = new BehaviorSubject<string>(EFilterStatus.ALL);
  public allTodos = new BehaviorSubject<ITodo[]>([]);
  public activeCount = new BehaviorSubject<number>(0);
  public titleAction = new BehaviorSubject<string>('');
  public isShowDialogCreateEdit = new BehaviorSubject<boolean>(false);
  public isShowDialogDelete = new BehaviorSubject<boolean>(false);
  public deleteTodoItem = new BehaviorSubject<ITodo>({
    id: 0,
    task: '',
    deadline: '',
    isCompleted: false,
  });
  public editTodoItem = new BehaviorSubject<ITodo>({
    id: 0,
    task: '',
    deadline: '',
    isCompleted: false,
  });

  getTitleAction(action: string) {
    this.titleAction.next(action);
  }

  getActiveFilter(status: string) {
    this.activeFilter.next(status);
  }

  getActiveCount(count: number) {
    this.activeCount.next(count);
  }

  getAllTodos(todos: ITodo[]) {
    this.allTodos.next(todos);
  }
}
