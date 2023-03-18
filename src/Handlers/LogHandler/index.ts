import chalk from "chalk";

export const ApplicationInfo = (content: string) => { 
  console.log(`${chalk.blue("[APPLICATION.INFO]")} ${content}`);
}

export const ApplicationError = (error: string) => {
  console.log(`${chalk.red("[APPLICATION.ERROR]")} ${error}`);
}

export const DatabaseInfo = (content: string) => {
  console.log(`${chalk.green("[DATABASE.INFO]")} ${content}`);
}

export const DatabaseError = (error: string) => {
  console.log(`${chalk.red("[DATABASE.ERROR]")} ${error}`);
}

export const RestAPIInfo = (content: string) => {
  console.log(`${chalk.cyan("[REST.API.INFO]")} ${content}`);
}

export const RestAPIError = (error: string) => {
  console.log(`${chalk.red("[REST.API.ERROR]")} ${error}`);
}