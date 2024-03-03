
import {faker} from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function generateTestData() {
  // Generate roles
 
  await prisma.role.create({
    data: {
      name: "Admin",
      description:"Platform Owner",
      role_id:1,
    }
  })

  await prisma.role.create({
    data: {
      name: "Client",
      description:"Platform User",
      role_id:2,
    }
  })


  await prisma.page.create({
    data: {
      name:"dashboard",
      description:"dashboard",
      page_id:1,

    }
  })


  await prisma.permission.create({
    data: {
      name:"dashboard",
      page_id:1,
      role_id:1
    }
  })


  await prisma.user.create({
    data: {
      password: "$2b$12$5hJ6j9sYL81PwooDy2U.quFUe8OUzC2M.A0PPrgYDqLTDN9KTe0eO",
      role_id: 1,
      email: "admin@admin.com",
      full_name: "Admin",
      lastLogin: faker.date.recent(),
      isActive: true
    }
  })

  await prisma.user.create({
    data: {
      password: "$12$AIppamVx9urGZtA.Ko6rIuL84JWWJbmTNgQ7FY8EACgbUbzFfl9EG",
      role_id: 2,
      email: "user@user.com",
      full_name: "User",
      lastLogin: faker.date.recent(),
      isActive: true
    }
  })
  // Generate users
  const users = [];
  for (let i = 1; i <= 100; i++) {
    users.push(
      prisma.user.create({
        data: {
          password: faker.internet.password(),
          role_id: faker.number.int({ min: 1, max: 2 }),
          email: faker.internet.email(),
          full_name: faker.person.fullName(),
          lastLogin: faker.date.recent(),
          isActive: faker.datatype.boolean()
        }
      })
    );
  }
  await Promise.all(users);


  // Generate salons
  const salons = [];
  for (let i = 1; i <= 50; i++) {
    salons.push(
      prisma.salon.create({
        data: {
          name: faker.company.name(),
          description: faker.lorem.sentence(),
          phone: faker.phone.number(),
          city: faker.location.city()
        }
      })
    );
  }
  await Promise.all(salons);

  
  // Generate services
  const services = [];
  for (let i = 1; i <= 50; i++) {
    services.push(
      prisma.service.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: faker.number.int({ min: 10, max: 1000 }),
          duration: faker.number.int({ min: 15, max: 180 }),
          salon_id:faker.number.int({ min: 1, max: 20 }),
          
        }
      })
    );
  }
  await Promise.all(services);



    // Generate staff
    const staff = [];
    for (let i = 1; i <= 50; i++) {
      staff.push(
        prisma.staff.create({
          data: {
            name: faker.person.fullName(),
            salon_id:faker.number.int({ min: 1, max: 20 }),
            service_id:faker.number.int({ min: 1, max: 50 }),
          }
        })
      );
    }
    await Promise.all(staff);

    

    // Generate appointments
    const appointments = [];
    for (let i = 0; i < 500; i++) {
      appointments.push(
        prisma.appointment.create({
          data: {
            user_id: faker.number.int({ min: 1, max: 100 }),
            staff_id: faker.number.int({ min: 1, max: 50 }),
            service_id: faker.number.int({ min: 1, max: 50 }),
            date_time: faker.date.future(),
            status:  ["pending", "completed", "canceled"][ faker.number.int({ min: 0, max: 2 })] 
          }
        })
      );
    }
    await Promise.all(appointments);
  console.log('Test data generated successfully.');
}

generateTestData()
  .catch(error => {
    console.error('Error generating test data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
