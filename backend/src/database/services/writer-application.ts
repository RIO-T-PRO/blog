import { prisma } from "@/database/db.js";

interface ApplyWriterParams {
  userId: string;
  reason: string;
  website?: string;
}

const applyToBecomeWriter = async ({
  userId,
  reason,
  website,
}: ApplyWriterParams) => {
  return prisma.writerApplication.create({
    data: {
      user_id: userId,
      reason,
      website,
    },
  });
};

const findApplicationById = async (applicaionId: string) => {
  return prisma.writerApplication.findUnique({
    where: { application_id: applicaionId },
  });
};

const findApplicationByUserId = async (userId: string) => {
  return prisma.writerApplication.findUnique({
    where: { user_id: userId },
  });
};

export const findAllApplications = async () => {
  return await prisma.writerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export { applyToBecomeWriter, findApplicationById, findApplicationByUserId };
