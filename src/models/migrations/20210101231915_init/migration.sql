-- CreateEnum
CREATE TYPE "roles" AS ENUM ('member', 'admin');

-- CreateEnum
CREATE TYPE "color_modes" AS ENUM ('dark', 'light');

-- CreateEnum
CREATE TYPE "chess_board_color" AS ENUM ('arctic', 'golden', 'loyal');

-- CreateTable
CREATE TABLE "users" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "roles" NOT NULL DEFAULT E'member',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reset_token" TEXT,
    "reset_token_expiry" INTEGER,
    "auto_queen" BOOLEAN NOT NULL DEFAULT false,
    "board_color" "chess_board_color" NOT NULL DEFAULT E'arctic',
    "show_legal" BOOLEAN NOT NULL DEFAULT true,
    "show_recent" BOOLEAN NOT NULL DEFAULT true,
    "color_mode" "color_modes" NOT NULL DEFAULT E'dark',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
