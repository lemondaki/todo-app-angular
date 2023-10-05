import { Component, Input } from '@angular/core';
import { todoService } from '../../service/todo.service';
import { IFilterStatus } from 'src/app/shared/interfaces/interface';
import { EFilterStatus } from '../../enum/enum';
@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  constructor(private todoService: todoService) {}
  @Input() filterStatus: IFilterStatus = {
    status: '',
    count: 0,
  };
  activeFilter: string = EFilterStatus.ALL;
  selectFilterStatus(event: string) {
    this.activeFilter = event;
    this.todoService.getActiveFilter(event);
  }
}
