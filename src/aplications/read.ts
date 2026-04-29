import { readDb, Task } from "../database/readdb"

async function read(): Promise<Array<Task>> {
    return await readDb()
}

export {read}