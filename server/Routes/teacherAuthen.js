import express from "express";
import authenticateToken from "../authenticate/authenticateUser.js";
import authenticateTeacher from "../authenticate/TeacherAuthentication.js";
const teacherRouter=express.Router();
teacherRouter.get("/ans",authenticateToken,authenticateTeacher);
export default teacherRouter;