import { MigrationInterface, QueryRunner } from "typeorm";

export class SocialMig1724066024072 implements MigrationInterface {
    name = 'SocialMig1724066024072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gallery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_9bced6619279a7472fdcfec6954" FOREIGN KEY ("galleryId") REFERENCES "gallery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_9bced6619279a7472fdcfec6954"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
    }

}
