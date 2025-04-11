import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from "typeorm";
import { Contact } from "./contact";

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Contact, (contact) => contact.country)
  contact: Contact[]
}