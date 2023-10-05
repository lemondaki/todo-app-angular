import { Component, OnInit, OnDestroy } from '@angular/core';
import { toastService } from 'src/app/shared/service/toast.service';
import { IToast } from '../../../shared/interfaces/interface';
import { takeUntil, Subject } from 'rxjs';
@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
  toast: IToast = {
    icon: '',
    message: '',
    title: '',
    style: '',
    time: 0,
  };
  isShowToast: boolean = false;
  destroy$ = new Subject();
  constructor(private toastService: toastService) {}
  handleCloseToast() {
    this.isShowToast = false;
  }
  ngOnInit(): void {
    this.toastService.ToastSubject.pipe(takeUntil(this.destroy$)).subscribe(
      (toast: IToast) => {
        if (!toast.icon || !toast.message || !toast.title) return;
        this.toast = { ...toast };
        this.isShowToast = true;
        setTimeout(() => {
          this.isShowToast = false;
        }, toast.time);
      }
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
