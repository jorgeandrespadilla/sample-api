import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';

const __dirname = dirname(fileURLToPath(import.meta.url + "/.."));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

export const read = async () => {
    await db.read();
    return db.data;
}

export const write = async (data = {}) => {
    db.data = data;
    await db.write();
}
