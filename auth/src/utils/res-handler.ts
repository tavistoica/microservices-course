import { Response } from "express";
import { logger } from "./logger";

export const resHandler = (
  res: Response,
  code: number | null = null,
  body: Object | null = null,
  redirect: string | null = null
) => {
  logger.info(`${code} ${JSON.stringify(body).slice(0, 30)}`);
  if (code) res.status(code);
  if (body) res.send(body);
  if (redirect) res.redirect(redirect);
};
