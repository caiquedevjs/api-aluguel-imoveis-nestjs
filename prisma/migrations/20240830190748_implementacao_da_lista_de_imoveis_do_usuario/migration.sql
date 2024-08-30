-- RedefineTables
PRAGMA defer_foreign_keys=ON;
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
    "bar_code" TEXT NOT NULL,
    "usuarioId" TEXT,
    CONSTRAINT "Imoveis_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Imoveis" ("availability", "bar_code", "description", "garage", "id", "room", "service_area", "type", "value") SELECT "availability", "bar_code", "description", "garage", "id", "room", "service_area", "type", "value" FROM "Imoveis";
DROP TABLE "Imoveis";
ALTER TABLE "new_Imoveis" RENAME TO "Imoveis";
CREATE UNIQUE INDEX "Imoveis_bar_code_key" ON "Imoveis"("bar_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
