

import { z } from "zod";


const envShema = z.object({
     SECRET_JWT: z.string().default("SUPERSCRET"),
     SECRET_COOKIE: z.string().default("SUPERSCRET"),
})

export const env = envShema.parse(process.env)