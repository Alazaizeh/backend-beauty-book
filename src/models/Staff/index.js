import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStaffStatisticsData = async () => {
  try {
    const StaffTotals = await prisma.staff.count();
    return StaffTotals;
  } catch (error) {
    console.log(error);
  }
};

export const getStaffData = async (page, rows, filterName, filterSort) => {
  const offset = page * rows;

  const staff = await prisma.staff.findMany({
    include: {
      service: {
        select: {
          name: true,
          price: true,
          duration: true,
          salon: {
            select: {
              name: true,
              description: true,
            },
          },
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
  return staff;
};

export const updateStaffData = async (id, data) => {
  const staff = await prisma.staff.update({
    where: {
      staff_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return staff;
};

export const addStaffData = async (data) => {
  const staff = await prisma.staff.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return staff;
};

export const deleteStaffData = async (id) => {
  await prisma.$transaction([
    // Delete associated appointments
    prisma.appointment.deleteMany({
      where: {
        staff_id: id,
      },
    }),

    // Delete the staff record
    prisma.staff.delete({
      where: {
        staff_id: id,
      },
    }),
  ]);

  return true;
};
