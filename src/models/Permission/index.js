import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPermissionsData = async () => {
  const permissions = await prisma.permission.findMany();
  return permissions;
};

export const updatePermissionData = async (id, data) => {
  const permission = await prisma.permission.update({
    where: {
      permission_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return permission;
};

export const addPermissionData = async (data) => {
  const permission = await prisma.permission.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return permission;
};

export const deletePermissionData = async (id) => {
  const permission = await prisma.permission.delete({
    where: {
      permission_id: id,
    },
  });
  return permission;
};
