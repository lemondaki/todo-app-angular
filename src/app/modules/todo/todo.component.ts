import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../shared/interfaces/interface';
import { apiService } from 'src/app/shared/service/api.service';
import { todoService } from 'src/app/shared/service/todo.service';
import { EAction } from '../../shared/enum/enum';
import { EFilterStatus } from '../../shared/enum/enum';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  isShowDialogCreateEdit: boolean = false;
  isShowDialogDelete: boolean = false;
  isLoading: boolean = false;
  activeCount: number = 0;
  activeFilter: string = '';
  todos: ITodo[] = [];
  filterToDo: ITodo[] = [];
  FilterStatus = EFilterStatus;
  constructor(
    private httpService: apiService,
    private todoService: todoService
  ) {}

  onClickCreateButton() {
    this.todoService.isShowDialogCreateEdit.next(true);
    this.todoService.getTitleAction(EAction.ADD);
  }

  handleFilterTodos(activeFilter: string) {
    this.filterToDo = [...this.todos];
    if (activeFilter === EFilterStatus.ACTIVE) {
      this.filterToDo = this.todos.filter((todo) => todo.isCompleted === false);
    }
    if (activeFilter === EFilterStatus.COMPLETED) {
      this.filterToDo = this.todos.filter((todo) => todo.isCompleted);
    }
    this.filterToDo.reverse();
  }

  ngOnInit() {
    this.isLoading = true;
    this.todoService.isShowDialogCreateEdit.subscribe((isShow) => {
      this.isShowDialogCreateEdit = isShow;
    });

    this.todoService.isShowDialogDelete.subscribe((isShow) => {
      this.isShowDialogDelete = isShow;
    });

    this.todoService.activeFilter.subscribe((activeFilter) => {
      this.activeFilter = activeFilter;
      this.handleFilterTodos(activeFilter);
    });

    this.httpService
      .getTodos()
      .pipe(
        switchMap((data) => {
          this.todoService.getAllTodos(data);
          return this.todoService.allTodos;
        })
      )
      .subscribe((todos) => {
        this.todos = todos;
        this.filterToDo = this.todos;
        this.handleFilterTodos(this.activeFilter);
        this.isLoading = false;
        setTimeout(() => {
          this.todoService.activeCount.subscribe((activeCount) => {
            this.activeCount = activeCount;
          });
        });
      });
  }
}
