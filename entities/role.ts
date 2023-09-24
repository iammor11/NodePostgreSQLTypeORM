import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", unique: true })
    name: string;

    @Column({ type: "json", name: "permissions", default: null, nullable: true })
    permissions: any[]

    @Column({ type: "boolean", default: true })
    isActive: Boolean;

    @Column({ type: "boolean", default: false, select: false })
    isDeleted: Boolean;

    @DeleteDateColumn({ name: "deletedAt", nullable: true, select: false })
    deletedAt: Date;

    @CreateDateColumn({ name: "createdAt", select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt", select: false })
    updatedAt: Date;
}