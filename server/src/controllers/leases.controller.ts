import { Request, Response } from "express";
import { prismaDb } from "../../prisma/prismaClient";

export const getLeases = async (req: Request, res: Response) => {
  try {
    const leases = await prismaDb.lease.findMany({
      include: {
        tenant: true,
        property: true,
      },
    });

    res.json(leases);
  } catch (error: any) {
    console.error("Error getting leases:", error.message);
    res
      .status(500)
      .json({ success: false, error: `Failed to get lease: ${error.message}` });
    return;
  }
};

export const getLeasePayment = async (req: Request, res: Response) => {
  try {
    const { leaseId } = req.params;
    const payments = await prismaDb.payment.findMany({
      where: { leaseId: Number(leaseId) },
    });

    res.json(payments);
  } catch (error: any) {
    console.error("Error getting lease payments:", error.message);
    res
      .status(500)
      .json({
        success: false,
        error: `Failed to get lease payments: ${error.message}`,
      });
    return;
  }
};
