import { Request, Response } from "express";
import { prismaDb } from "../../prisma/prismaClient";
import { HttpStatusCode } from "axios";

export const getApplications = async (req: Request, res: Response) => {
  try {
    const { userId, userType } = req.query;

    let whereClause = {};

    if (userId && userType) {
      if (userType === "tenant") {
        whereClause = { tenantClerkId: String(userId) };
      } else if (userType === "manager") {
        whereClause = { property: { managerClerkId: String(userId) } };
      }
    }
    const applications = await prismaDb.application.findMany({
      where: whereClause,
      include: {
        tenant: true,
        property: {
          include: {
            location: true,
            manager: true,
          },
        },
      },
    });

    function calculateNextPaymentDate(startDate: Date): Date {
      const today = new Date();
      const nextPaymentDate = new Date(startDate);
      while (nextPaymentDate <= today) {
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      }
      return nextPaymentDate;
    }

    const formattedApplications = Promise.all(
      applications.map(async (app) => {
        const lease = await prismaDb.lease.findFirst({
          where: {
            tenant: {
              clerkUserId: app.tenantClerkId,
            },
            propertyId: app.propertyId,
          },
          orderBy: { startDate: "desc" },
        });

        return {
          ...app,
          property: {
            ...app.property,
            address: app.property.location.address,
          },
          manager: app.property.manager,
          lease: lease
            ? {
                ...lease,
                nextPaymentDate: calculateNextPaymentDate(lease.startDate),
              }
            : null,
        };
      })
    );

    res.json({ success: true, data: formattedApplications });
  } catch (error: any) {
    console.error("Error getting applications:", error.message);
    res.status(500).json({
      success: false,
      error: `Failed to get applications: ${error.message}`,
    });
    return;
  }
};

/**
 * Our current createApplication controller, creates the lease when it receives an application creation request which is bad.
 * We follow a tutorial so we leave it as such. To read more on proper implementation, look at learning.md in the root directory.
 */
export const createApplication = async (req: Request, res: Response) => {
  try {
    const {
      applicationDate,
      status,
      propertyId,
      tenantClerkId,
      name,
      email,
      phoneNumber,
      message,
    } = req.body;

    const property = await prismaDb.property.findUnique({
      where: { id: propertyId },
      select: { pricePerMonth: true, securityDeposit: true },
    });

    if (!property) {
      res
        .status(HttpStatusCode.NotFound)
        .json({ success: false, message: "Property Not Found" });
      return;
    }

    const newApplication = await prismaDb.$transaction(async (prismaDb) => {
      //Create lease first
      const lease = await prismaDb.lease.create({
        data: {
          startDate: new Date(), //Today
          endDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ), //1 year from today
          rent: property?.pricePerMonth,
          deposit: property?.securityDeposit,
          property: {
            connect: { id: propertyId },
          },
          tenant: {
            connect: { clerkUserId: tenantClerkId },
          },
        },
      });

      // create application with lease connection
      const application = await prismaDb.application.create({
        data: {
          applicationDate: new Date(applicationDate),
          status,
          name,
          email,
          phoneNumber,
          message,
          property: {
            connect: { id: propertyId },
          },
          tenant: {
            connect: { clerkUserId: tenantClerkId },
          },
          lease: {
            connect: { id: lease.id },
          },
        },
        include: {
          property: true,
          tenant: true,
          lease: true,
        },
      });

      return application;
    });

    res
      .status(HttpStatusCode.Created)
      .json({ success: true, data: newApplication });
  } catch (error: any) {
    console.error("Error creating application:", error.message);
    res.status(500).json({
      success: false,
      error: `Failed to create application: ${error.message}`,
    });
    return;
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await prismaDb.application.findUnique({
      where: { id: Number(applicationId) },
      include: {
        tenant: true,
        property: true,
      },
    });

    if (!application) {
      res
        .status(HttpStatusCode.NotFound)
        .json({ success: false, message: "Application Not Found" });
      return;
    }

    if (status === "Approved") {
      const newLease = await prismaDb.lease.create({
        data: {
          startDate: new Date(), //Today
          endDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ), //1 year from today
          rent: application.property?.pricePerMonth,
          deposit: application.property?.securityDeposit,
          propertyId: application.propertyId,
          tenantClerkId: application.tenantClerkId,
        },
      });

      // update property to connect to tenant after they have been approved
      await prismaDb.property.update({
        where: { id: application.propertyId },
        data: {
          tenants: {
            connect: { clerkUserId: application.tenantClerkId },
          },
        },
      });

      //update the application with the new lease id
      await prismaDb.application.update({
        where: { id: Number(applicationId) },
        data: { status, leaseId: newLease.id },
        include: {
          property: true,
          tenant: true,
          lease: true,
        },
      });
    } else {
      //when status is Denied
      await prismaDb.application.update({
        where: { id: Number(applicationId) },
        data: { status },
      });
    }

    //fetch updated application and send to client
    const updatedApplication = await prismaDb.application.findUnique({
      where: { id: Number(applicationId) },
      include: {
        property: true,
        tenant: true,
        lease: true,
      },
    });

    res.json({ success: true, data: updatedApplication });
  } catch (error: any) {
    console.error("Error getting lease payments:", error.message);
    res.status(500).json({
      success: false,
      error: `Failed to get lease payments: ${error.message}`,
    });
    return;
  }
};

export const getLeasePayment = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.error("Error getting lease payments:", error.message);
    res.status(500).json({
      success: false,
      error: `Failed to get lease payments: ${error.message}`,
    });
    return;
  }
};
