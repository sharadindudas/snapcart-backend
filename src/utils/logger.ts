import winston from "winston";
import { ENV } from "../config/config";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = (): "debug" | "warn" => {
    const env = ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp as string} ${info.level}: ${info.message as string}`)
);

const transports = [new winston.transports.Console({ format: consoleFormat })];

export const logger = winston.createLogger({
    level: level(),
    levels,
    transports
});
