import pino from "pino";
import { logLevel } from "../config/fe";

const pinoOptions = {
  level: logLevel,
  formatters: {
    level(label: string) {
      return { level: label };
    },
  },
};

export const logger = pino(pinoOptions);
export default logger;
