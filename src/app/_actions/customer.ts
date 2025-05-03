"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateCustomerSchema,
  CreateCustomerType,
} from "../schemas/customer.schema";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/routes";

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { success, data } = CreateCustomerSchema.safeParse(props);

    if (!success) {
      console.log({ error: "Invalid data" });
      return { success: false, message: "Invalid data" };
    }
    if (data.terms !== "true") {
      return { success: false, message: "You must accept the terms" };
    }
    const { date, terms, slug, ...rest } = data;
    await prisma.customer.create({
      data: {
        ...rest,
        bookingDate: date,
        termsAccepted: terms === "true",
        classified: { connect: { slug } },
      },
    });
 
    return { success: true, message: "Reservation Successful!" };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteCustomerAction = async (id: number) => {
  try {
    await prisma.customer.delete({ where: { id } });
    revalidatePath(routes.admin.customers);
    return { success: true, message: "Customer deleted" };
  } catch (error) {
    console.log("Error deleting customer: ", { error });
    return {
      success: false,
      message: "Something went wrong deleting customer",
    };
  }
};