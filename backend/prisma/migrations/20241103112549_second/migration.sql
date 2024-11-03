/*
  Warnings:

  - You are about to drop the column `description` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `mal_id` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `mdl_id` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `poster_url` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `synopsis` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `title_english` on the `Watchlist` table. All the data in the column will be lost.
  - The `popularity` column on the `Watchlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `video` column on the `Watchlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vote_average` column on the `Watchlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vote_count` column on the `Watchlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,movie_id]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movie_id` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "items",
DROP COLUMN "mal_id",
DROP COLUMN "mdl_id",
DROP COLUMN "media_type",
DROP COLUMN "name",
DROP COLUMN "poster_url",
DROP COLUMN "synopsis",
DROP COLUMN "title_english",
ADD COLUMN     "movie_id" TEXT NOT NULL,
DROP COLUMN "popularity",
ADD COLUMN     "popularity" DOUBLE PRECISION,
DROP COLUMN "video",
ADD COLUMN     "video" BOOLEAN,
DROP COLUMN "vote_average",
ADD COLUMN     "vote_average" DOUBLE PRECISION,
DROP COLUMN "vote_count",
ADD COLUMN     "vote_count" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_movie_id_key" ON "Watchlist"("userId", "movie_id");
