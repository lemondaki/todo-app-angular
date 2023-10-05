import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { RadioButtonComponent } from 'src/app/shared/components/radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { CreateEditTodoComponent } from './create-edit-todo-dialog/create-edit-todo.component';
import { DeleteTodoComponent } from './delete-todo-dialog/delete-todo.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DialogComponent,
    TodoComponent,
    TodoItemComponent,
    RadioButtonComponent,
    FilterComponent,
    CreateEditTodoComponent,
    DeleteTodoComponent,
    ToastNotificationComponent,
    DatePickerComponent,
    TextFieldComponent,
    CheckboxComponent,
  ],
  imports: [CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule],
  exports: [TodoComponent],
})
export class TodoModule {}
