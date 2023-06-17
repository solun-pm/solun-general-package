import mongoose from "mongoose";

const functionErrLogSchema = new mongoose.Schema({
        function_name: {
            type: String,
            required: true,
        },
        error_message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true,
    }
);

const functionErrLog = mongoose.models.functionErrLog || mongoose.model("functionErrLog", functionErrLogSchema);

export default functionErrLog;