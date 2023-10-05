export enum EFilterStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export enum ELabelTodoStatus {
  LATE = 'late',
  FAR = 'far',
  NEAR = 'near',
}

export enum EAction {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export enum EToastIcon {
  SUCCESS = 'fas fa-check-circle',
  ERROR = 'fas fa-exclamation-circle',
}

export enum EToastStyle {
  SUCCESS = 'toast--success',
  ERROR = 'toast--error',
}

export enum EToastTitle {
  SUCCESS = 'successfully',
  ERROR = 'error',
}

export enum ETimeUnit {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
}
