export const getEnvVariable = (key: string): string =>
{
  if(!import.meta.env[key])
  {
    throw new Error(`Env variable ${key} is not defined`);
  }

  return String(import.meta.env[key]);
};

export const WS_URL = getEnvVariable('VITE_WS_API_URL');