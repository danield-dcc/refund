import z from "zod";

export const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  value: z.string().min(1, "Valor é obrigatório"),
  receipt: z
    .custom<FileList>()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Comprovante é obrigatório",
    ),
});

export type FormDataType = z.infer<typeof schema>;

export const detailsSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  value: z.string().min(1, "Valor é obrigatório"),
  receipt: z.custom<FileList>().optional(),
});

export type DetailFormDataType = z.infer<typeof detailsSchema>;

export const SearchRefundSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
});

export type FormRefundSchemaType = z.infer<typeof SearchRefundSchema>;
