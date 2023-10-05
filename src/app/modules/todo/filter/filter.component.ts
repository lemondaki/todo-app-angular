import { Component, OnInit } from '@angular/core';
import { todoService } from 'src/app/shared/service/todo.service';
import { EFilterStatus } from '../../../shared/enum/enum';
import { IFilterStatus } from '../../../shared/interfaces/interface';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(private todoService: todoService) {}
  listFilterStatus: IFilterStatus[] = [
    {
      status: EFilterStatus.ALL,
      count: 0,
    },
    {
      status: EFilterStatus.COMPLETED,
      count: 0,
    },
    {
      status: EFilterStatus.ACTIVE,
      count: 0,
    },
  ];

  getCountFilterStatus() {
    this.todoService.allTodos.subscribe((data) => {
      const totalCount = data.length;
      const activeCount = data.filter((todo) => !todo.isCompleted).length;
      const completedCount = totalCount - activeCount;
      this.todoService.getActiveCount(activeCount);
      this.listFilterStatus = this.listFilterStatus.map((s) => {
        if (s.status === EFilterStatus.ALL) {
          return { ...s, count: totalCount };
        }
        if (s.status === EFilterStatus.COMPLETED) {
          return { ...s, count: completedCount };
        }
        if (s.status === EFilterStatus.ACTIVE) {
          return { ...s, count: activeCount };
        }
        return s;
      });
    });
  }

  ngOnInit() {
    this.getCountFilterStatus();
  }
}
