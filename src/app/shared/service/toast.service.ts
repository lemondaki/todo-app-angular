import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EToastIcon } from 'src/app/shared/enum/enum';
import { EToastStyle } from 'src/app/shared/enum/enum';
import { EToastTitle } from 'src/app/shared/enum/enum';
import { IToast } from 'src/app/shared/interfaces/interface';
@Injectable({
  providedIn: 'root',
})
export class toastService {
  constructor() {}
  ToastSubject = new BehaviorSubject<IToast>({
    icon: '',
    message: '',
    title: '',
    style: '',
    time: 0,
  });

  showSuccess(message: string, time: number) {
    this.ToastSubject.next({
      icon: EToastIcon.SUCCESS,
      title: EToastTitle.SUCCESS,
      style: EToastStyle.SUCCESS,
      message,
      time,
    });
  }

  showErrors(message: string, time: number) {
    this.ToastSubject.next({
      icon: EToastIcon.ERROR,
      title: EToastTitle.ERROR,
      style: EToastStyle.ERROR,
      message,
      time,
    });
  }
}
