import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm"
import { Country } from "./country";

@Entity({ name: 'contacts' })
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    note: string;

    @ManyToOne(() => Country, (country) => country.contacts)
    country: Country;
}

