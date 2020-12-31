-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERUSER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ChessBoardTheme" AS ENUM ('ARCTIC', 'GOLDEN', 'LOYAL');

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" INTEGER,
    "chessBoardTheme" "ChessBoardTheme" NOT NULL DEFAULT E'ARCTIC',
    "autoPromotion" BOOLEAN NOT NULL DEFAULT false,
    "highlightMoves" BOOLEAN NOT NULL DEFAULT true,
    "showLegalMoves" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
