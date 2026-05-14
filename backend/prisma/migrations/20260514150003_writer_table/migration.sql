-- CreateTable
CREATE TABLE "writers" (
    "writer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "writers_pkey" PRIMARY KEY ("writer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "writers_user_id_key" ON "writers"("user_id");

-- AddForeignKey
ALTER TABLE "writers" ADD CONSTRAINT "writers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
