import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSalonsStatisticsData = async () => {
  try {
    const salonsTotals = await prisma.salon.count();
    return salonsTotals;
  } catch (error) {
    console.log(error);
  }
};

export const getSalonsData = async (page, rows, filterName, filterSort) => {
  try {
    const offset = page * rows;

    const salonsData = await prisma.salon.findMany({
      include: {
        staff: {
          select: {
            name: true,
            staff_id: true,
          },
        },
        services: {
          select: {
            name: true,
            description: true,
            service_id: true,
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

      ...(filterSort && {
        orderBy: {
          [filterSort]: "desc",
        },
      }),
    });

    return salonsData;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching salons data.");
  }
};
export const findSalonsData = async (searchString) => {
  const salons = await prisma.salon.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchString,
          },
        },
        {
          services: {
            some: {
              OR: [
                {
                  name: {
                    contains: searchString,
                  },
                },
              ],
            },
          },
        },
      ],
    },
    select: { name: true, services: { select: { name: true } } },
  });

  return salons;
};
export const updateSalonData = async (id, data) => {
  const salon = await prisma.salon.update({
    where: {
      salon_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return salon;
};

export const addSalonData = async (data) => {
  const salon = await prisma.salon.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return salon;
};

export const deleteSalonData = async (id) => {
  const salon = await prisma.salon.delete({
    where: {
      salon_id: id,
    },
  });
  return salon;
};
