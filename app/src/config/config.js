import 'dotenv/config';

export const PORT_APP = process.env.PORT_APP;
export const HOSTNAME = `http://192.168.0.170:${PORT_APP}`;
export const X_TOKEN = process.env.BEARER_TOKEN_X;