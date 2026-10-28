import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', comment: '所属用户' })
  userId: number;

  @Column({ length: 100, comment: '待办标题' })
  title: string;

  @Column({
    type: 'tinyint',
    name: 'is_important',
    comment: '是否重要 0-不重要 1-重要',
    default: 0
  })
  isImportant: number;

  @Column({
    type: 'tinyint',
    name: 'is_urgent',
    comment: '是否紧急 0-不紧急 1-紧急',
    default: 0
  })
  isUrgent: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '状态: 0待办 1进行中 2已完成'
  })
  status: number;

  // @Column({ comment: '开始时间' })
  // startTime: Date;

  // @Column({ comment: '结束时间' })
  // endTime: Date;

  @CreateDateColumn({ comment: '创建时间' })
  createDate: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateDate: Date;
}

/**
 


CREATE TABLE todo (
  id            BIGINT PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  -- 重要/紧急（四象限）
  is_important  TINYINT(1) DEFAULT 0,
  is_urgent     TINYINT(1) DEFAULT 0,
  -- 状态
  status        TINYINT DEFAULT 0,  -- 0待办 1进行中 2已完成
  -- 时间
  plan_start    DATETIME NULL,      -- 计划开始（计划内）
  plan_end      DATETIME NULL,      -- 计划结束（已延期判断依据）
  due_at        DATETIME NULL,      -- 截止时间
  completed_at  DATETIME NULL,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);


视图	过滤条件
重要	is_important = 1
紧急	is_urgent = 1
已完成	status = 2
全部	无过滤（或按用户）
已延期	status != 2 AND due_at < NOW()
计划内	plan_start IS NOT NULL AND plan_start <= NOW() AND status != 2
今天	DATE(due_at) = CURDATE() 或计划时间落在今天

“已延期”和“今天”这类不要存成状态字段，应该用时间字段 + 查询时计算。
否则需要定时任务去刷新状态，容易不一致。只有“已完成”这种用户主动触发的状态才适合落库。

 */
