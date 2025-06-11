import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { prismaDb } from "../../prisma/prismaClient";

export const tenantsCreation = async (req: Request, res: Response) => {
  try {
    const { clerkId, email, name, phoneNumber, image_url } = req.body;
    if (!clerkId || !email || !name) {
      res.status(HttpStatusCode.BadRequest).json({
        success: false,
        error: "Missing required fields: clerkId, email, and name are required",
      });
      return;
    }

    const tenantExists = await prismaDb.tenant.findUnique({
      where: { clerkUserId: clerkId },
    });
    if (tenantExists !== null) {
      res.status(HttpStatusCode.Ok).json({
        success: true,
        data: { ...tenantExists, role: "tenant" },
        message: "Tenant already exists",
      });
      return;
    }

    const newTenant = await prismaDb.tenant.create({
      data: {
        clerkUserId: clerkId,
        name,
        email,
        phoneNumber,
        imageUrl: image_url,
      },
    });

    res.status(HttpStatusCode.Created).json({
      success: true,
      data: { ...newTenant, role: "tenant" },
      message: "Tenant created successfully",
    });
  } catch (error) {
    console.error("Error creating tenant:", error);
    res.status(500).json({ success: false, error: "Failed to create tenant" });
    return;
  }
};

export const getTenantByClerkId = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;

    const tenant = await prismaDb.tenant.findUnique({
      where: { clerkUserId: clerkId },
      include: {
        favorites: true,
      },
    });
    if (!tenant) {
      res.status(HttpStatusCode.NotFound).json({
        success: false,
        error: `Tenant with ClerkId: ${clerkId} does not exist`,
      });
      return;
    }

    res.status(HttpStatusCode.Ok).json({
      success: true,
      data: { ...tenant, role: "tenant" },
    });
  } catch (error) {
    console.error("Error getting tenant:", error);
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, error: "Failed to get tenant" });
    return;
  }
};

export const updateTenant = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;
    const tenantExists = await prismaDb.tenant.findUnique({
      where: { clerkUserId: clerkId },
    });
    if (!tenantExists) {
      res.status(HttpStatusCode.NotFound).json({
        success: true,
        error: "Tenant with clerkId not found",
      });
      return;
    }

    const { email, name, phoneNumber, image_url } = req.body;

    // Update manager
    const updatedTenant = await prismaDb.tenant.update({
      where: { clerkUserId: clerkId },
      data: {
        name,
        email,
        phoneNumber,
        imageUrl: image_url,
      },
    });

    res.status(HttpStatusCode.Ok).json({
      success: true,
      data: { ...updatedTenant, role: "tenant" },
      message: "Tenant created successfully",
    });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ success: false, error: "Failed to update manager" });
    return;
  }
};
// export const getManager
