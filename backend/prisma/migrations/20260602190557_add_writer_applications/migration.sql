-- CreateTable
CREATE TABLE "writer_applications" (
    "application_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "website" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "writer_applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "writer_applications_user_id_key" ON "writer_applications"("user_id");

-- CreateIndex
CREATE INDEX "writer_applications_status_idx" ON "writer_applications"("status");

-- AddForeignKey
ALTER TABLE "writer_applications" ADD CONSTRAINT "writer_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
