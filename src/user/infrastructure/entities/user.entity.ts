import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ nullable: false, type: 'varchar' })
  public readonly name: string;

  @CreateDateColumn({ nullable: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  public readonly updatedAt: Date;

  @DeleteDateColumn()
  public readonly deletedAt: Date;
}
