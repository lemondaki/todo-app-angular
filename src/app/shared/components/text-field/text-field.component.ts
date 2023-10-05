import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  taskInput: FormControl = new FormControl();
  onTouched: Function = () => {};
  onChange: Function = () => {};

  writeValue(value: string) {
    this.taskInput.setValue(value);
  }

  registerOnChange(onChange: Function) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }
}
