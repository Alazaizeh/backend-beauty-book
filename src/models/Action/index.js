import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getActionsData = async () => {
  const actions = await prisma.action.findMany();
  return actions;
};

export const updateActionData = async (id, data) => {
  const action = await prisma.action.update({
    where: {
      action_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return action;
};

export const addActionData = async (data) => {
  const action = await prisma.action.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return action;
};

export const deleteActionData = async (id) => {
  const action = await prisma.action.delete({
    where: {
      action_id: id,
    },
  });
  return action;
};
