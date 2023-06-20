import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class User {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    contactName: string

    @Column()
    fullName: string

    @Column()
    role: string;

    @Column({default : true})
    isActive: boolean;

    @Column()
    accessToken: string
}