import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPagesData = async () => {
  const pages = await prisma.page.findMany();
  return pages;
};

export const updatePageData = async (id, data) => {
  const page = await prisma.page.update({
    where: {
      page_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return page;
};

export const addPageData = async (data) => {
  const page = await prisma.page.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return page;
};

export const deletePageData = async (id) => {
  const page = await prisma.page.delete({
    where: {
      page_id: id,
    },
  });
  return page;
};
