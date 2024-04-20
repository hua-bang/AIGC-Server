import { Request } from 'express';

export const getFullUrl = (req: Request) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const url = req.originalUrl;

  return `${protocol}://${host}${url}`;
};
