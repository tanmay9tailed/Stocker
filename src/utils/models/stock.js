import mongoose, { Schema, Types } from "mongoose";

const stockSchema = new mongoose.Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        symbol: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Stock = mongoose.models?.Stock || mongoose.model("Stock", stockSchema);

export default Stock;
