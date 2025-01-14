import { z } from "zod";


const envShema = z.object({
     SECRET_JWT: z.string().default("SUPERSCRET"),
     SECRET_COOKIE: z.string().default("SUPERSCRET"),
     PORT: z.number().int().default(3031),
     HOST: z.string().default("0.0.0.0"),
})

export const env = envShema.parse(process.env)