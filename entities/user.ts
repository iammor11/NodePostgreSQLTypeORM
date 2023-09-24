import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { Role } from "./role"

export enum StatusEnum {
    AVAILABLE = "available",
    BUSY = "busy",
    DONTDISTURB = "dontDisturb",
    OFFWORK = "offWork",
    APPEARAWAY = "appearAway",
    BREAK = "break",
}

@Entity("users")
class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, type: "text" })
    email: string;

    @Column({ type: "text" })
    firstName: string;

    @Column({ type: "text" })
    lastName: string;

    @Column({ type: "text", select: false })
    password: string;

    @Column({
        type: "enum",
        enum: StatusEnum,
        default: StatusEnum.OFFWORK,
    })
    status: string;

    @OneToOne(() => Role)
    @JoinColumn()
    roleId: Role

    @Column({ type: "boolean", default: false })
    isVerified: Boolean;

    @Column({ type: "boolean", default: false, select: false })
    isBlocked: Boolean;

    @Column({ type: "boolean", default: false, select: false })
    isDeleted: Boolean;

    @DeleteDateColumn({ name: "deletedAt", nullable: true, select: false })
    deletedAt: Date;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt", select: false })
    updatedAt: Date;
}

export default User