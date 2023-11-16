import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    BuyerEmail :   {type :String,required :true},
    BuyerName :  {type :String,required :true},
    NoOfTickets :{type:Number,required:true},
    BuyerAddress :  {type :String,required :true},
});


export const BookingsModel = mongoose.model("bookings",BookingSchema);
