import dotenv from 'dotenv';
import express,{Request, Response, Application, Express} from 'express'

dotenv.config();
const app:Application = express();
const PORT = process.env.PORT;


app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.send('Up and running')
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})