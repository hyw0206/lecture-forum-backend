import prisma from "../../config/prisma.ts";
import { CategoryCreateInput } from "../../generated/prisma/models/Category.ts";
import { CategoryStatus, Prisma } from "../../generated/prisma/client.ts";

const getCategoryList = () => {
    // findMany(): 여러개의 row를 SELECT
    return prisma.category.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

const createCategory = async (input: CategoryCreateInput) => {
    try {
        return await prisma.category.create({
            data: input,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P20002") {
                throw new Error("ALREADY_EXIST_CATEGORY");
            }
        }
        throw e;
    }
};

const toggleCategoryStatus = async (id: number) => {
    const exist = await prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!exist) {
        throw new Error("CATEGORY_NOT_FOUND");
    }
    const newStatus =
        exist.status === CategoryStatus.ACTIVE ? CategoryStatus.INACTIVE : CategoryStatus.ACTIVE;

    return prisma.category.update({
        where: {
            id,
        },
        data: {
            status: newStatus,
        },
    });
};

export default { getCategoryList, createCategory, toggleCategoryStatus };
