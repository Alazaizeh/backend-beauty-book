import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getServicesData = async (page, rows, filterName, filterSort) => {
  const offset = page * rows;

  const services = await prisma.service.findMany({
    include: {
      salon: true,
      staff: true,
      appointments: {
        select: {
          status: true,
        },
      },
    },
    where: {
      // Apply filters only if any filter condition is met
      ...(filterName !== "" && {
        name: { contains: filterName },
      }),
    },
    skip: offset,
    ...(rows > 0 && {
      take: rows,
    }),

    orderBy: {
      [filterSort]: "desc",
    },
  });
  return services;
};

export const getServicesStatisticsData = async () => {
  try {
    const serviceTotals = await prisma.service.count();
    return serviceTotals;
  } catch (error) {
    console.log(error);
  }
};
export const updateServiceData = async (id, data) => {
  const service = await prisma.service.update({
    where: {
      service_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return service;
};

export const addServiceData = async (data) => {
  const service = await prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return service;
};

export const deleteServiceData = async (id) => {
  await prisma.$transaction([
    // Delete associated appointments
    prisma.appointment.deleteMany({
      where: {
        service_id: id,
      },
    }),
    // Delete the staff record
    prisma.service.delete({
      where: {
        service_id: id,
      },
    }),
  ]);
  return true;
};
