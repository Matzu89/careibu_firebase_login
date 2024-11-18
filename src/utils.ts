// Throw an error when env is not available
export const env = (key: string): string => {
    const env = import.meta.env[key];

    if (!env) throw new Error(`${key} does not exist`);

    return env;
}