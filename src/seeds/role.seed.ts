import { RoleModel } from "@/models/role.model";

const defaultRoles = [
  {
    name: "Administrador",
    description: "Acceso total a todos los recursos del sistema",
    permissions: ["*"],
  },
  {
    name: "Instructor",
    description: "Puede gestionar cursos y ver reportes",
    permissions: [
      "user:read",
      "user:list",
      "course:create",
      "course:read",
      "course:update",
      "course:delete",
      "course:list",
      "report:read",
      "report:create",
    ],
  },
  {
    name: "Estudiante",
    description: "Puede ver cursos y gestionar su perfil",
    permissions: [
      "course:read",
      "course:list",
      "user:read",
      "user:update",
    ],
  },
];

export const seedRoles = async (): Promise<void> => {
  try {
    for (const role of defaultRoles) {
      const existing = await RoleModel.findOne({ name: role.name });
      if (!existing) {
        await RoleModel.create(role);
        console.log(`Rol "${role.name}" creado con ${role.permissions.length} permisos`);
      }
    }
  } catch (error) {
    console.error("Error al sembrar roles:", error);
  }
};
