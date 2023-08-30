const entriesDbPath = './data/db/entries.json.db';
const appConfigurationPath = './data/app.json';

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
        starting_utc_date: new Date().toUTCString(),
      }),
    );
  }
}

export async function getAppConfiguration() {
  return JSON.parse(await Deno.readTextFile(appConfigurationPath));
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
