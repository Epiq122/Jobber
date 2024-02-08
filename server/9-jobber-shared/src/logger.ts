import windston, { Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};

/**
 * Creates a Winston logger with Elasticsearch transport.
 * @param elasticsearchNode - The Elasticsearch node URL.
 * @param name - The name of the service.
 * @param level - The log level.
 * @returns The configured Winston logger.
 */
export const winstonLogger = (
  elasticsearchNode: string,
  name: string,
  level: string
): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    elasticsearch: {
      level,
      clientOpts: {
        node: elasticsearchNode,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false,
      },
      transformer: esTransformer,
    },
  };
  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    options.elasticsearch
  );
  const logger: Logger = windston.createLogger({
    exitOnError: false,
    defaultMeta: { service: name },
    transports: [new windston.transports.Console(options.console), esTransport],
  });
  return logger;
};
