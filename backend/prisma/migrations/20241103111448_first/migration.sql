-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "items" JSONB,
    "backdrop_path" TEXT,
    "mal_id" TEXT,
    "mdl_id" TEXT,
    "title_english" TEXT,
    "synopsis" TEXT,
    "title" TEXT,
    "name" TEXT,
    "original_title" TEXT,
    "overview" TEXT,
    "poster_path" TEXT,
    "media_type" TEXT,
    "adult" BOOLEAN,
    "original_language" TEXT,
    "genre_ids" INTEGER[],
    "popularity" TEXT,
    "release_date" TEXT,
    "video" TEXT,
    "vote_average" TEXT,
    "vote_count" TEXT,
    "poster_url" TEXT,
    "description" TEXT,
    "images" JSONB,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
