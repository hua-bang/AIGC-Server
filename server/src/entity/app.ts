import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('openapi-app') // 明确指定表名为 "scene-module"
export class App {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'app_name' })
  appName: string;

  @Column()
  description: string;

  @Column({ name: 'app_secret' })
  appSecret: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createAt: Date;
}
