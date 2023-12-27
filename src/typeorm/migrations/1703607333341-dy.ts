import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dy1703607333341 implements MigrationInterface {
  name = 'Dy1703607333341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_name" character varying(36) NOT NULL, "email" character varying(48) NOT NULL, "type" character varying NOT NULL DEFAULT 'default', CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_408f44831acabfe0bf002d4050" ON "user_entity" ("user_name") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_415c35b9b3b6fe45a3b065030f" ON "user_entity" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_415c35b9b3b6fe45a3b065030f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_408f44831acabfe0bf002d4050"`,
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
