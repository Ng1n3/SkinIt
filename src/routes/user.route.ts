import {Application, Express} from 'express'
import validateUser from '../middleware/validate.user'
import { createUserSchema } from '../schemas/users.schema'
import { createUserHandler } from '../controller/users.controller'

export default function userRoutes(app:Application){
  app.post("/signup", validateUser(createUserSchema), createUserHandler)
}