import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITodo } from '../../../shared/interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { todoService } from 'src/app/shared/service/todo.service';
import { apiService } from 'src/app/shared/service/api.service';
import { toastService } from 'src/app/shared/service/toast.service';
import { EAction } from '../../../shared/enum/enum';
import { switchMap, Subscription } from 'rxjs';
@Component({
  selector: 'app-create-edit-todo',
  templateUrl: './create-edit-todo.component.html',
  styleUrls: ['./create-edit-todo.component.scss'],
})
export class CreateEditTodoComponent implements OnInit, OnDestroy {
  inforTodoForm: FormGroup;
  Action = EAction;
  titleAction: string = '';
  editTodoInfor: ITodo = { id: 0, task: '', deadline: '', isCompleted: false };
  private subscriptions: Subscription[] = [];
  constructor(
    private todoService: todoService,
    private http: apiService,
    private toastService: toastService,
    private fb: FormBuilder
  ) {
    this.inforTodoForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(4)]],
      deadline: ['', Validators.required],
    });
  }

  handleSaveTodo() {
    if (
      !this.inforTodoForm.controls['task'].value.trim() ||
      this.inforTodoForm.controls['task'].invalid ||
      this.inforTodoForm.controls['deadline'].invalid
    ) {
      return;
    }
    if (this.titleAction === EAction.ADD) {
      const data = {
        id: Math.random() * 100,
        task: this.inforTodoForm.controls['task'].value,
        deadline: this.inforTodoForm.controls['deadline'].value,
        isCompleted: false,
      };
      this.todoService.isShowDialogCreateEdit.next(false);
      this.http
        .addTodo(data)
        .pipe(switchMap(() => this.http.getTodos()))
        .subscribe({
          next: (data) => {
            this.todoService.getAllTodos(data);
            this.toastService.showSuccess('Add todo successfully!', 2000);
          },
          error: () => {
            this.toastService.showErrors('Add todo failure!', 2000);
          },
        });
    }

    if (this.titleAction === EAction.EDIT) {
      if (
        this.inforTodoForm.controls['task'].invalid ||
        this.inforTodoForm.controls['deadline'].invalid
      ) {
        return;
      }
      const data = {
        ...this.editTodoInfor,
        task: this.inforTodoForm.controls['task'].value,
        deadline: this.inforTodoForm.controls['deadline'].value,
      };
      this.todoService.isShowDialogCreateEdit.next(false);
      this.http
        .editTodo(data)
        .pipe(switchMap(() => this.http.getTodos()))
        .subscribe({
          next: (data) => {
            this.todoService.getAllTodos(data);
            this.toastService.showSuccess('Update todo successfully!', 2000);
          },
          error: () => {
            this.toastService.showErrors('Update todo failure!', 2000);
          },
        });
    }
  }

  handleCloseDialog() {
    this.todoService.isShowDialogCreateEdit.next(false);
  }

  validateRequired(inputFieldValidate: string) {
    return (
      this.inforTodoForm.controls[inputFieldValidate].errors?.['required'] &&
      this.inforTodoForm.get(inputFieldValidate)?.touched
    );
  }

  validateMinlength() {
    return this.inforTodoForm.controls['task'].errors?.['minlength'];
  }

  ngOnInit() {
    this.subscriptions.push(
      this.todoService.titleAction.subscribe((title) => {
        this.titleAction = title;
      })
    );
    if (this.titleAction === EAction.EDIT) {
      this.subscriptions.push(
        this.todoService.editTodoItem.subscribe((todo) => {
          this.inforTodoForm.patchValue({
            task: todo.task,
            deadline: todo.deadline,
          });
          this.editTodoInfor = { ...todo };
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
