import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Gwen',
        email: 'gwenstew@gmail.com',
        password: 'prismaseed',
        folders: {
            create: [
                {
                    name: 'Coding',
                    Subfolders: {
                        create: [
                            {
                                name: 'Web Dev',
                                bookmarks: {
                                    create: [
                                        {
                                            title: 'Prisma Docs',
                                            url: 'https://www.prisma.io/docs/postgres/introduction/getting-started?utm_source=website&utm_medium=postgres-page',
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }

            ]
        }

    }
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({data: u});
    } 
}

main();

