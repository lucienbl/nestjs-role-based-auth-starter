import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from 'src/auth/Roles';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    birthday: string;

    @Column()
    presentation: string;

    @Column({ default: Roles.USER })
    role: number;
}
