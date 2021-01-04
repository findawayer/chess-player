-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('member', 'admin');

-- CreateEnum
CREATE TYPE "color_mode" AS ENUM ('dark', 'light');

-- CreateEnum
CREATE TYPE "chess_board_color" AS ENUM ('arctic', 'golden', 'loyal');

-- CreateTable
CREATE TABLE "user" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT E'member',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "reset_token" TEXT,
    "reset_token_expiry" INTEGER,
    "color_mode" "color_mode",
    "chess_auto_queen" BOOLEAN,
    "chess_board_color" "chess_board_color",
    "chess_show_legal" BOOLEAN,
    "chess_show_recent" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");
