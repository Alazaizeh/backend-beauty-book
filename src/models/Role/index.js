import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRolesData = async () => {
  const roles = await prisma.role.findMany({

    include:{permissions:{
      include:{page:true,action:true}
    }}
  });
  return roles;
};

export const updateRoleData = async (id, data) => {
  const role = await prisma.role.update({
    where: {
      role_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return role;
};

export const addRoleData = async (data) => {
  const role = await prisma.role.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return role;
};

export const deleteRoleData = async (id) => {
  const role = await prisma.role.delete({
    where: {
      role_id: id,
    },
  });
  return role;
};
