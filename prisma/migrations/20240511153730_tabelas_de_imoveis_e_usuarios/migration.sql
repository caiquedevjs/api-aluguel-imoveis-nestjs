-- CreateTable
CREATE TABLE "Imoveis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "garage" INTEGER NOT NULL,
    "service_area" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "value" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Imoveis_id_key" ON "Imoveis"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_mail_key" ON "Usuarios"("mail");
