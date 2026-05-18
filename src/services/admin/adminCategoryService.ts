import prisma from "../../config/prisma.ts";

const getCategoryList = () => {
    // findMany(): 여러개의 row를 SELECT
    return prisma.category.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

export default { getCategoryList };
