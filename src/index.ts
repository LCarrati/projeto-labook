import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './Router/userRouter'
import postRouter from './Router/postRouter'
import likeDislikeRouter from './Router/likeDislike'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/likes", likeDislikeRouter);
