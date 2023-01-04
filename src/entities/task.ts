import { Field, Int } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id: number;

    @CreateDateColumn()
    @Field(()=>String)
    created: Date;

    @UpdateDateColumn()
    @Field(()=>String)
    updated: Date;

    @Column()
    @Field(()=>String)
    title: string;

    @Column()
    @Field(()=>Boolean)
    isCompleted: boolean;
}