import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { prismaDb } from "../../prisma/prismaClient";
import { wktToGeoJSON } from "@terraformer/wkt";

export const managerCreation = async (req: Request, res: Response) => {
  try {
    const { clerkId, email, name, phoneNumber, image_url } = req.body;
    if (!clerkId || !email || !name) {
      res.status(HttpStatusCode.BadRequest).json({
        success: false,
        error: "Missing required fields: clerkId, email, and name are required",
      });
      return;
    }

    const managerExists = await prismaDb.manager.findUnique({
      where: { clerkUserId: clerkId },
    });
    if (managerExists) {
      res.status(HttpStatusCode.Ok).json({
        success: true,
        data: { ...managerExists, role: "manager" },
        message: "Manager already exists",
      });
      return;
    }

    // Create new manager
    const newManager = await prismaDb.manager.create({
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
      data: { ...newManager, role: "manager" },
      message: "Manager created successfully",
    });
  } catch (error) {
    console.error("Error creating manager:", error);
    res.status(500).json({ success: false, error: "Failed to create manager" });
    return;
  }
};

export const getManagerByClerkId = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;
    const manager = await prismaDb.manager.findUnique({
      where: { clerkUserId: clerkId },
    });
    if (!manager) {
      res.status(HttpStatusCode.NotFound).json({
        success: false,
        error: `Manager with ClerkId: ${clerkId} does not exist`,
      });
      return;
    }

    res.status(HttpStatusCode.Ok).json({
      success: true,
      data: { ...manager, role: "manager" },
    });
  } catch (error) {
    console.error("Error getting manager:", error);
    res.status(500).json({ success: false, error: "Failed to get manager" });
    return;
  }
};

export const updateManager = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;
    const managerExists = await prismaDb.manager.findUnique({
      where: { clerkUserId: clerkId },
    });
    if (!managerExists) {
      res.status(HttpStatusCode.NotFound).json({
        success: true,
        error: "Manager with clerkId not found",
      });
      return;
    }

    const { email, name, phoneNumber } = req.body;

    // Update manager
    const updatedManager = await prismaDb.manager.update({
      where: { clerkUserId: clerkId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.status(HttpStatusCode.Ok).json({
      success: true,
      data: { ...updatedManager, role: "manager" },
      message: "Manager created successfully",
    });
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ success: false, error: "Failed to update manager" });
    return;
  }
};

export const getManagerProperties = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;

    const properties = await prismaDb.property.findMany({
      where: { managerClerkId: clerkId },
      include: { location: true },
    });

    const propertiesWithFormattedLocation = await Promise.all(
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

    res.json(propertiesWithFormattedLocation);
  } catch (error) {
    console.error("Error getting manager properties:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to get manager properties" });
    return;
  }
};
