import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ name: 'user_id', comment: '所属用户' })
  // userId: number;

  @Column({ length: 100, comment: '待办标题' })
  title: string;

  @Column({
    length: 500,
    nullable: true,
    comment: '这是待办描述谢谢这是待办描谢谢谢谢谢'
  })
  description: string;
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '状态: 0-未完成 1-已完成'
  })
  status: number;

  // @Column({ comment: '开始时间' })
  // startTime: Date;

  // @Column({ comment: '结束时间' })
  // endTime: Date;

  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date;
}
