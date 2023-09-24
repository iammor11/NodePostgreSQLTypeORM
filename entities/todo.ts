import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import User from "./user"

@Entity("todos")
class Todo extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "text" })
    text: string

    @Column({ type: "text" })
    description: string

    @OneToOne(() => User)
    @JoinColumn()
    userId: User

    @Column({ type: "boolean", default: false })
    isDeleted: Boolean;

    @DeleteDateColumn({ name: "deletedAt", nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Todo