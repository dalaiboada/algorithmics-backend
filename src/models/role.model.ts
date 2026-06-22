import { Schema, model } from "mongoose";
import { IRole } from "@/interfaces/role.interface";

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    permissions: [{ type: String }],
  },
  { timestamps: true },
);

export const RoleModel = model<IRole>("Role", RoleSchema);
