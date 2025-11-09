const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  FullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
  MobileNumber: { type: String, required: true, trim: true, match: /^\+?[0-9]{10,15}$/ },
  CarModel: { type: String, required: true, trim: true },
  EngineType: { type: String, required: true, trim: true },
  SelectedServices: { type: [String], required: true, default: [] },
  ServiceType: { type: String, required: true },
  Price: { type: Number, default: 0, min: 0 },
  VehicleNumber: { type: String, required: true, uppercase: true, trim: true, match: /^[A-Z0-9\-\s]{5,20}$/ },
  AppointmentDate: { type: Date, required: true },
  AdditionalRequirements: { type: String, default: "", trim: true, maxlength: 1000 },
  Status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "declined"],
    default: "pending",
  },
  AssignedMechanic: { type: String, default: "" },
},{ timestamps: true });

module.exports = mongoose.model("BookingDetail", BookingSchema);
