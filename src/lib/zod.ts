import { object, string, z } from "zod";

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = z.object({
  name:z.string().min(3, "O nome deve ter até 3 letras"),
  email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
  password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
  address:z.string().min(15, "O Endereço deve ter até 15 letras"),
  zipCode:z.string().min(8, "O CEP deve ter até 8 números"),
});

export const userSchema = z.object({
  name:z.string().min(3, "O nome deve ter até 3 letras").optional(),
  email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email").optional(),
  address:z.string().min(15, "O Endereço deve ter até 15 letras").optional(),
  zipCode:z.string().min(8, "O CEP deve ter até 8 números").optional(),
});

export const signUpRestaurantSchema = z.object({
  name:z.string().min(3, "O nome deve ter até 3 letras"),
  email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
  password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters")
});

export const restaurantSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  address: z.string().min(1, "O endereço é obrigatório."),
  about: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  type: z.string().min(1, "O tipo é obrigatório."),
  foodTypes: z.array(z.string().min(1, "Os tipos de comida são obrigatórios.")),
  // bannerUrl: z.string().url("A URL do banner deve ser válida."),
});

export const productSchema = z.object({
  productImage: z.union([
    z
      .object({
        file: z
          .any()
          .refine(
            (file) => file && file.length === 1,
            "É necessário enviar uma imagem."
          )
          .refine(
            (file) =>
              file &&
              file[0] &&
              ["image/jpeg", "image/png", "image/gif"].includes(file[0].type),
            "A imagem deve ser do tipo JPEG, PNG ou GIF."
          )
          .refine(
            (file) => file && file[0] && file[0].size <= 5 * 1024 * 1024,
            "A imagem deve ter no máximo 5MB."
          )
          .optional(),
      })
      .refine((data) => !!data.file, {
        message: "A imagem é obrigatória.",
      }),
    z.string().min(10, "URL invalida").optional(),
  ]),
  productName:z.string().min(1, "O nome é obrigatório"),
  productPrice:z.number().min(1, "O preço é obrigatório"),
  productCategory: z.string({required_error: "Nível de acesso obrigatório para o cadastro!",}).optional(),
  productDescription:z.string().min(1, "A descrição é obrigatória"),
})

export const infoSchema = z.object({
  title: z.string().min(1, "Informe um titulo.").optional(),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres."),
  about: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres.").optional(),
  foodTypes: z.array(z.string().optional()),
})