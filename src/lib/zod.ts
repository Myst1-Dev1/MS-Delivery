import { object, string, z } from "zod";

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

export const restaurantSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  address: z.string().min(1, "O endereço é obrigatório."),
  about: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  type: z.string().min(1, "O tipo é obrigatório."),
  foodTypes: z.array(z.string().min(1, "Os tipos de comida são obrigatórios.")),
  bannerUrl: z.string().url("A URL do banner deve ser válida."),
});