import winston from "winston";
import "winston-daily-rotate-file";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  //template sting
  //Vamos a reemplazar
  //por esto "2021-10-05" [ERORR]: Hola mundo esto es un error
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },

  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "white",
    silly: "gray",
  },
};

const fileTransport = new winston.transports.DailyRotateFile({
  dirname: "./logs",
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH-mm",
  //Vamos a definir una politica de retencion de archivos
  //Vamos a comprimir los archivos que ya no se esten usando
  zippedArchive: true,
  //Vamos a definir el tamano maximo de los archivos
  maxSize: "1m",
  //Vamos a definir el numero maximo de archivos que vamos a tener disponibles, una vez que lleguemos a este numero, automaticamente los archivos mas viejos se van a eliminar
  maxFiles: 3,
  //Vamos a definir la frecuencia en tiempo que queremos segmentar nuestros logs.
  frequency: "1m",
  level: "debug",
});
//Vamos a crear nuestro logged
//Para esto tenemos que definir un trasporte

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),

  transports: [
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(
        winston.format.colorize({ all: true, colors: customLevels.colors })
      ),
    }),
    fileTransport,
    //new winston.transports.File({ filename: "logs/error.log", level: "warn" }),
  ],
});

//Cómo registrar los eventos en consola
//logger.error("Hola mundo esto es un error")
//logger.warn("Hola mundo esto es un warn")
//logger.info("Hola mundo conlogged")
//logger.http("Hola mundo esto es un http")
//logger.verbose("Hola mundo esto es un verbose")
//logger.debug("Hola mundo esto es un debug")
//logger.silly("Hola mundo esto es un silly")

export default logger;
