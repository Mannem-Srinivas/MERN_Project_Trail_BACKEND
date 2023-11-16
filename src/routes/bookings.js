import express from "express";
import { BookingsModel } from "../models/Bookings.js";

const router = express.Router();



router.post("/", async (req, res) => {
    try {
        const newBooking = await BookingsModel.create(req.body);
        res.json(newBooking);
    } catch (error) {
        console.error("Error occurred while creating booking:", error);
        res.status(500).json({ error: "An error occurred while creating the booking." });
    }
});


export { router as bookingsRouter};