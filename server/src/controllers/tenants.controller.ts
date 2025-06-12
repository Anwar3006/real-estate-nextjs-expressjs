import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { prismaDb } from "../../prisma/prismaClient";
import { wktToGeoJSON } from "@terraformer/wkt";

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

export const getTenantResidences = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;

    const properties = await prismaDb.property.findMany({
      where: { tenants: { some: { clerkUserId: clerkId } } },
      include: {
        location: true,
      },
    });

    const residencesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prismaDb.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.json(residencesWithFormattedLocation);
  } catch (error) {
    console.error("Error getting tenant's residences:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to get tenant's residences" });
    return;
  }
};

export const addFavoriteProperty = async (req: Request, res: Response) => {
  try {
    const { clerkId, propertyId } = req.params;

    const tenant = await prismaDb.tenant.findUnique({
      where: { clerkUserId: clerkId },
      include: { favorites: true },
    });

    const propertyIdNumber = Number(propertyId);
    const existingFavorites = tenant?.favorites || [];

    //if propertyId isnt part of favorites
    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant = await prismaDb.tenant.update({
        where: { clerkUserId: clerkId },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: { favorites: true },
      });

      res.json(updatedTenant);
      return;
    } else {
      res.status(HttpStatusCode.Conflict).json({
        success: false,
        message: "Property already added as favorite",
      });
    }
  } catch (error: any) {
    console.error("Error adding favorite property:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to add favorite property" });
    return;
  }
};

export const removeFavoriteProperty = async (req: Request, res: Response) => {
  try {
    const { clerkId, propertyId } = req.params;

    const propertyIdNumber = Number(propertyId);
    const updatedTenant = await prismaDb.tenant.update({
      where: { clerkUserId: clerkId },
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: { favorites: true },
    });

    res.json(updatedTenant);
  } catch (error: any) {
    console.error("Error removing favorite property:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to remove favorite property" });
    return;
  }
};
