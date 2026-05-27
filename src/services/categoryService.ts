import prisma from "../config/prisma.ts";

const getActiveCategories = async () => {
    return prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            status: "ACTIVE",
        },
        orderBy: {
            id: "desc",
        },
    });
};

export default {
    getActiveCategories,
};
