import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAppointmentsStatisticsData = async () => {
  try {
    const appointmentsTotals = await prisma.$queryRaw`SELECT
    Appointment.status,
    CAST(COUNT(*) AS UNSIGNED)  AS total_appointments,
    SUM(service.price) AS total_service_price
FROM
    Appointment
JOIN
    Service ON Appointment.service_id = Service.service_id
GROUP BY
    Appointment.status;
`;

    const formattedData = appointmentsTotals.map((entry) => ({
      ...entry,
      total_appointments: Number(entry.total_appointments),
      total_service_price: Number(entry.total_service_price),
    }));

    const responseObject = formattedData.reduce((acc, item) => {
      acc[item.status] = {
        total_appointments: item.total_appointments,
        total_service_price: item.total_service_price,
      };
      return acc;
    }, {});

    const totalObject = formattedData.reduce(
      (acc, item) => {
        acc.total_appointments += item.total_appointments;
        acc.total_service_price += item.total_service_price;
        return acc;
      },
      { total_appointments: 0, total_service_price: 0 }
    );

    return { ...responseObject, ...totalObject };
  } catch (error) {
    console.log(error);
  }
};

export const getTimeSlotsData = async (selectedDate, selectedService) => {
  const startTime = new Date(selectedDate).getTime();

  const endTime = startTime + 60000 * selectedService.duration;

  const busySlot = await prisma.appointment.findMany({
    where: {
      service_id: selectedService.service_id,
      status: "pending",
      date_time: {
        gte: new Date(startTime).toISOString(),
        lt: new Date(endTime).toISOString(),
      },
    },
    select: {
      date_time: true,
      service: true,
    },
  });

  if (busySlot.length > 0) return false;
  return true;
};

export const bookAppointment = async (selectedDate, selectedService) => {
  await prisma.appointment.create({
    data: {
      service_id: selectedService.service_id,
      date_time: selectedDate,
      status: "pending",
    },
  });

  return "Added Successfully";
};

export const getAppointmentsData = async (
  page,
  rows,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate
) => {
  try {
    const offset = page * rows;

    const appointmentsData = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            user_id: true,
          },
        }, // Include user details
        staff: {
          select: {
            name: true,
            staff_id: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
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
        ...(filterStatus !== "all" && { status: filterStatus }),
        ...(filterName !== "" && {
          OR: [
            {
              service: {
                salon: {
                  name: { contains: filterName },
                },
              },
            },
            {
              service: {
                name: { contains: filterName },
              },
            },
            {
              user: {
                full_name: { contains: filterName },
              },
            },
            {
              appointment_id: { contains: filterName },
            },
          ],
        }),
        ...(!!filterStartDate &&
          !!filterEndDate && {
            AND: [
              { date_time: { gte: filterStartDate } },
              { date_time: { lte: filterEndDate } },
            ],
          }),
      },
      skip: offset,
      ...(rows > 0 && {
        take: rows,
      }),
    });

    return appointmentsData;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching appointments data.");
  }
};

export const getAppointmentDataByID = async (id) => {
  try {
    const appointments = await prisma.appointment.findFirst({
      where: {
        appointment_id: id,
      },
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            user_id: true,
          },
        }, // Include user details
        staff: {
          select: {
            name: true,
            staff_id: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
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
    });

    return appointments;
  } catch (error) {
    console.log(error);
  }
};
export const updateAppointmentData = async (id, data) => {
  const appointment = await prisma.appointment.update({
    where: {
      appointment_id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return appointment;
};

export const addAppointmentData = async (data) => {
  const appointment = await prisma.appointment.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  return appointment;
};

export const deleteAppointmentData = async (id) => {
  const appointment = await prisma.appointment.delete({
    where: {
      appointment_id: id,
    },
  });
  return appointment;
};
