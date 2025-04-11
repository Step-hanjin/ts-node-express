import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1744312410762 implements MigrationInterface {
    name = 'Default1744312410762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "note" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paymonths" ("id" SERIAL NOT NULL, "month" text NOT NULL, "start_time" text NOT NULL, "end_time" text NOT NULL, CONSTRAINT "PK_72444a0145c5728b84e2216a4e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_37c7a529302085865a7167a053e" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_37c7a529302085865a7167a053e"`);
        await queryRunner.query(`DROP TABLE "paymonths"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
