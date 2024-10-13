import React from "react"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "../Pages/Home.jsx"
import Layout from "../Layout/Layout.jsx"
import StudentSignup from "../components/Signup.jsx"
import Analytics from "../Pages/Analytics.jsx"
import Courses from "../Pages/Courses.jsx"
import Schedule from "../Pages/Schedule"
import Assignment from "../Pages/Assignment.jsx"
import Message from "../Pages/Message.jsx"
import Help from "../Pages/Help.jsx"
import Login from "../components/Login.jsx"
import TeacherSignup from "../components/TeacherSignup.jsx"
const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[{
            path:"/",
            element:<Home/>
        },
        {
            path:"/StudentsignUp",
            element:<StudentSignup/>
        },
        {
            path:"/home",
            element:<Home/>
        },{
            path:"/analytics",
            element:<Analytics/>
        },{
            path:"/courses",
            element:<Courses/>
        },{
            path:"/schedule",
            element:<Schedule/>
        },{
            path:"/assignment",
            element:<Assignment/>
        },{
            path:"/messages",
            element:<Message/>
        },{
            path:"/help",
            element:<Help/>
        },{
            path:"/login",
            element:<Login/>
        },{
            path:"/TeacherSignup",
            element:<TeacherSignup/>
        }
    ]
    }
])
export default router;