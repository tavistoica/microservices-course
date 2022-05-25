export const throwBootstrapError = (envVariables: string[]) => {
  for (let envVar in envVariables) {
    if (!process.env.JWT_KEY) {
      throw new Error(
        `Environment variable '${process.env[`${envVar}`]}' is not defined.`
      );
    }
  }
};
