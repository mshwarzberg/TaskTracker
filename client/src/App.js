import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewTask from "./components/NewTask";
import ViewTask from "./components/ViewTask";
import Home from "./components/Home";

export default function App() {

    return (
        <Router>
            <Routes>
                <Route 
                    path='/' 
                    element={
                        <Home />
                    }
                />
                <Route 
                    path='/newtask' 
                    element={
                        <NewTask />
                    }
                />
                <Route 
                    path='/viewtasks' 
                    element={<ViewTask />}
                />
            </Routes>
        </Router>
    );
}

