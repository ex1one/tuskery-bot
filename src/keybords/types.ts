import { Task } from '@prisma/client';
import { MyContext } from '../types/context';

export interface GetInlineTasksButtonsProps {
  page: number;
  tasks: Task[];
  ctx: MyContext;
  hasMore: boolean;
}
