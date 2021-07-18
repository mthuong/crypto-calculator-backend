interface FailRecord<T> {
  data: T;
  messages: string[];
  type?: any;
}

export class BulkResult<T> {
  numOfFail: number;

  numOfSuccess: number;

  failRecords: FailRecord<T>[];
}
