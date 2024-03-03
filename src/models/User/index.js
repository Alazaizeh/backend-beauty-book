import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsersData = async () => {
  const users = await prisma.user.findMany({
    include: { role: true },
  });
  return users;
};

export const updateUserData = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      user_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return user;
};

export const updateUserRoleData = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      user_id: id,
    },
    data: {
      role_id: data,
    },
  });
  return user;
};

export const updateUserStatusData = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      user_id: id,
    },
    data: {
      isActive: data,
    },
  });
  return user;
};

export const addUserData = async (data) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return user;
};

export const deleteUserData = async (id) => {
  const user = await prisma.user.delete({
    where: {
      user_id: id,
    },
  });
  return user;
};

export const getUserByEmail = async (email) => {
  const users = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return users;
};

export const getActiveUserByEmail = async (email) => {
  const users = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return users;
};

export const addNewUser = async (email, password, first_name, last_name) => {

 
  const users = await prisma.user.create({
    data: {
      full_name: first_name + " " + last_name,
      password: password,
      email: email,
      role_id:2
    },
  });
  return users;
};

export const updateUserLoginDate = async (email) => {
  const users = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      lastLogin: new Date(),
    },
  });
  return users;
};
export const getUserAccessList = async (email) => {
  // Find the user by ID
  const user = await prisma.user.findUnique({
    where: { email: email },
    include: {
      role: {
        include: { permissions: { include: { page: true, action: true } } },
      },
    },
  });

  // Extract pages and actions from permissions
  const allowedPages = new Set();
  const allowedActions = new Set();
 
  user.role.permissions.forEach((permission) => {
    if(permission.page)
    allowedPages.add(permission.page.name);
    if(permission.action)
    allowedActions.add(permission.action.name);
  });

  return { pages: [...allowedPages], actions: [...allowedActions] };
};
