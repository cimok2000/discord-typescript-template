export function checkEnvironmentVariables(envArray: string[]) {
  const missingEnvironmentVariables: string[] = [];
  envArray.forEach((env) => {
    if (!process.env[env]) {
      missingEnvironmentVariables.push(env);
    }
  });

  if (missingEnvironmentVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvironmentVariables.join(', ')}`
    );
  }
}

export function getApplicationID(applicationEnvironment: string) {
  if (applicationEnvironment === "production") {
    if (!process.env.PRODUCTION_ID) {
      throw new Error("Missing production application ID");
    }
    return process.env.PRODUCTION_ID;
  }
  if (applicationEnvironment === "development") {
    if (!process.env.DEVELOPMENT_ID) {
      throw new Error("Missing development application ID");
    }
    return process.env.DEVELOPMENT_ID;
  }
  throw new Error("Invalid application environment");
}

export function getDiscordToken(applicationEnvironment: string) {
  if (applicationEnvironment === "production") {
    if (!process.env.PRODUCTION_TOKEN) {
      throw new Error("Missing production token");
    }
    return process.env.PRODUCTION_TOKEN;
  }
  if (applicationEnvironment === "development") {
    if (!process.env.DEVELOPMENT_TOKEN) {
      throw new Error("Missing development token");
    }
    return process.env.DEVELOPMENT_TOKEN;
  }
  throw new Error("Invalid application environment");
}