import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const location = await prisma.location.update({
        where: {id: 1},
        data: {published: true}
    })

    console.log(location)
}

// async function main () {
//   const allLocations = await prisma.location.findMany();
//   console.log(allLocations);
// }

// async function main() {
//   await prisma.locationType.create({
//     data: {
//       name: "Farmer's Market",
//       locations: {
//         create: [
//           {
//             title: "Union Square Market",
//           },
//           {
//             title: "Washington Square Market",
//           },
//           {
//             title: "Irving Square Market",
//           },
//         ],
//       },
//     },
//   });
//   const allLocationTypes = await prisma.locationType.findMany({
//     include: {
//       locations: true,
//     },
//   });

//   console.dir(allLocationTypes, { depth: null });
// }

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.disconnect();
    })