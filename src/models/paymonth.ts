import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm"

@Entity({ name: 'paymonths' })
export class Paymonth {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text'})
    month: string;
    
    @Column({ type: 'text'})
    start_time: string;

    @Column({ type: 'text'})
    end_time: string;
}

