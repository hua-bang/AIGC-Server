import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scene_module') // 明确指定表名为 "scene-module"
export class SceneModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  prompt: string;

  @Column()
  imgSrc: string;

  @Column({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @Column({ type: 'timestamp', name: 'created_at' })
  createAt: Date;
}
