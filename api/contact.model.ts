import mongoose from "mongoose";
const { Schema } = mongoose;
const ContactsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    lat: {
      type: String,
    },
    lon: {
      type: String,
    },
  },
  { timestamps: true, collection: "contacts" }
);

export default mongoose.model("Contact", ContactsSchema);
