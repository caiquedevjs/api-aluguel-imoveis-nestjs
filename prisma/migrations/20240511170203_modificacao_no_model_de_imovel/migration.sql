/*
  Warnings:

  - Added the required column `bar_code` to the `Imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Imoveis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "garage" INTEGER NOT NULL,
    "service_area" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "value" REAL NOT NULL,
    "bar_code" TEXT NOT NULL
);
INSERT INTO "new_Imoveis" ("availability", "description", "garage", "id", "room", "service_area", "type", "value") SELECT "availability", "description", "garage", "id", "room", "service_area", "type", "value" FROM "Imoveis";
DROP TABLE "Imoveis";
ALTER TABLE "new_Imoveis" RENAME TO "Imoveis";
CREATE UNIQUE INDEX "Imoveis_bar_code_key" ON "Imoveis"("bar_code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
