const entriesDbPath = './data/db/entries.json.db';
const appConfigurationPath = './data/app.json';

export interface iAppConfiguration {
  startingUtcDate: string;
}

export async function firstSignInSetup() {
  const entriesDbExists = await exists(entriesDbPath);
  const appConfigurationExists = await exists(appConfigurationPath);

  if (!entriesDbExists) {
    await Deno.writeTextFile(entriesDbPath, '');
  }

  if (!appConfigurationExists) {
    await Deno.writeTextFile(
      appConfigurationPath,
      JSON.stringify({
        startingUtcDate: new Date().toUTCString(),
      }),
    );
  }
}

export async function getAppConfiguration(): Promise<iAppConfiguration> {
  return JSON.parse(
    await Deno.readTextFile(appConfigurationPath),
  ) as iAppConfiguration;
}

const exists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
};
