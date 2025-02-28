import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { isCustomerValid, isAdminValid } from "./UserController.js";

export function createBooking(req, res) {
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const startingId = 1800;

  Booking.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1;

      const newBooking = new Booking({
        bookingId: newId,
        roomId: req.body.roomId,
        email: req.user.email,
        start: req.body.start,
        end: req.body.end,
      });

      newBooking
        .save()
        .then((result) => {
          res.json({
            message: "Booking created successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            message: "Booking creation failed",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Booking creation failed",
        error: err,
      });
    });
}

export async function createBookingByCategory(req, res){
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  try {
		const { category, start, end } = req.body;

		// Validate input
		if (!category || !start || !end) {
			return res.status(400).json({
				message: "Invalid input. Category, start, and end dates are required.",
			});
		}

		const startDate = new Date(start);
		const endDate = new Date(end);

		if (startDate >= endDate) {
			return res.status(400).json({
				message:
					"Invalid date range. Start date must be earlier than end date.",
			});
		}

		// Find bookings that overlap with the given dates
		const overlappingBookings = await Booking.find({
			$or: [
				{ start: { $lt: endDate }, end: { $gt: startDate } }, // Full or partial overlap
			],
		});

		const occupiedRooms = overlappingBookings.map((booking) => booking.roomId);

		// Find available rooms in the given category
		const availableRooms = await Room.find({
			roomId: { $nin: occupiedRooms },
			category: category,
		});

		if (availableRooms.length === 0) {
			return res.status(404).json({
				message:
					"No available rooms in the selected category for the given dates.",
			});
		}

		// Generate booking ID
		const startingId = 1200;
		const bookingCount = await Booking.countDocuments();
		const newBookingId = startingId + bookingCount + 1;

		// Create new booking
		const newBooking = new Booking({
			bookingId: newBookingId,
			roomId: availableRooms[0].roomId, // Select the first available room
			email: req.user.email,
			status: "pending", // Default status
			start: startDate,
			end: endDate,
		});

		const savedBooking = await newBooking.save();

		return res.status(201).json({
			message: "Booking created successfully",
			booking: savedBooking,
		});
	} catch (error) {
		console.error("Error creating booking:", error);
		return res.status(500).json({
			message: "Booking creation failed",
			error: error.message,
		});
	}
}

export function getBooking(req, res) {
  Booking.find().then((list) => {
    res.json({
      message: "Successfull",
      list: list,
    });
  });
}

export function getBookingById(req, res) {
  const id = req.params.bookingId;

  Booking.find({ bookingId: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          bookingId: id,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function getBookingByRoomId(req, res) {
  const id = req.params.roomId;

  Booking.find({ roomId: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          roomId: id,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function getBookingsByDate(req, res) {
  const start = req.body.start;
  const end = req.body.end;

  Booking.find({
    start: {
      $gte: start,
    },
    end: {
      $lt: new Date(end),
    },
  })
    .then((result) => {
      res.json({
        message: "Filtered bookings",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to get filtered bookings",
        error: err,
      });
    });
}

export function updateBooking(req, res) {
  if (!isCustomerValid(req) && !isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const id = req.params.bookingId;
  const updatedBooking = req.body;

  Booking.findOneAndUpdate({ bookingId: id }, updatedBooking)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          bookingId: id,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: updatedBooking,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function deleteBooking(req, res) {
  if (!isCustomerValid(req) && !isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const id = req.params.bookingId;

  Booking.findOneAndDelete({ bookingId: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          bookingId: id,
        });
      } else {
        res.status(201).json({
          message: "Booking deleted successfully",
          result: id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Booking deletion failed",
        error: err,
      });
    });
}
