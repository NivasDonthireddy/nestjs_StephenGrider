const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1671988503901 {
    name = 'initialSchema1671988503901'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "admin" bit NOT NULL CONSTRAINT "DF_7b2e9d910c214ff466c555d7bcd" DEFAULT 1, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" int NOT NULL IDENTITY(1,1), "approved" bit NOT NULL CONSTRAINT "DF_687244a6195b0ed2d721278fe23" DEFAULT 0, "price" int NOT NULL, "make" nvarchar(255) NOT NULL, "model" nvarchar(255) NOT NULL, "year" int NOT NULL, "lng" int NOT NULL, "lat" int NOT NULL, "mileage" int NOT NULL, "userId" int, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
