import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Output() eventToggleTodo = new EventEmitter();
  @Input() todo: ITodo = { id: 0, task: '', deadline: '', isCompleted: false };
}
