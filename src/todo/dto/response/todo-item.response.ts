import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TodoItemResponse {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  isDone: boolean;
}
