import express, { Request, Response } from 'express'
import cors from 'cors'

import userRouter from './Router/userRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", userRouter);
// app.use("/posts", postRouter);
// app.use("/likes", likeDisRouter);
