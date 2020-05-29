import mongo from "mongoose";
const Schema = mongo.Schema;

const visitorSchema = new Schema({
  cuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "not",
    enum: ["present", "not"],
  },
});
var visitor = mongo.model("Visitor", visitorSchema);

export default visitor;