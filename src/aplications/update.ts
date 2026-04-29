import fs from "fs";
import { readDb, Task } from "../database/readdb";

type UpdateTaskData = Partial<Omit<Task, "id">>;  //tranforma todos em campos opcionais e remove o campo id de Task

async function update(id: number, data: UpdateTaskData): Promise<void> {
    const dados: Task[] = await readDb();

    const index = dados.findIndex((item) => item.id === id);

    if (index === -1) {
        throw new Error("ID não encontrado.");
    }

    const taskAtualizada: Task = {
        ...dados[index],
        name: data.name ?? dados[index].name,
        description: data.description ?? dados[index].description,
        status: data.status ?? dados[index].status,
        updated_at: new Date(),
    };

    dados[index] = taskAtualizada;

    const header = "id;title;description;status;created_at;created_at";

    const conteudo = dados.map((item) =>
        `${item.id};${item.name};${item.description};${item.status};${item.created_at};${item.updated_at ?? ""}`
    );

    fs.writeFileSync(
        "src/database/db.csv",
        [header, ...conteudo].join("\n")
    );
}

export { update };