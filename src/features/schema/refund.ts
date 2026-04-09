import z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  value: z.string().min(1, "Valor é obrigatório"),
  receipt: z
    .custom<FileList>()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Comprovante é obrigatório",
    ),
});

export type FormData = z.infer<typeof schema>;