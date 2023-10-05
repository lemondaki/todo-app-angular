import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  deadlineInput: FormControl = new FormControl();
  onTouched: Function = () => {};
  onChange: Function = () => {};

  writeValue(value: string) {
    this.deadlineInput.setValue(value);
  }

  registerOnChange(onChange: Function) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }
}
