import express from "express";
import { read } from "./aplications/read"
import { create } from "./aplications/create"
import { remove } from "./aplications/remove"
import { update } from "./aplications/update"
import { json } from "node:stream/consumers";

const app = express()

app.use(express.json())

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await read()
        return res.status(200).json(tasks)
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
})

app.post("/tasks/create", async (req, res) => {
    try {
        const newItem = await create(req.body)

        res.status(201).json({
            message: "Item criado com sucesso!",
            data: newItem
        })
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
})

app.delete("/tasks/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const numericId = Number(id);

        await remove(numericId)

        return res.status(200).json({ message: "Task removida com sucesso!" })
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
})

app.patch("/tasks/update/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            return res.status(400).json({message: "Insira um Id válido!"})
        }

        const data = req.body

        await update (id, data)

        return res.status(200).json({message: "Task atualizada com sucesso! "})
    } catch (error:any) {
        return res.status(400).json({message: error.message})
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log("Serividor rodando na porta 3000")
})

