
import { Grid, Fade } from "@material-ui/core";
import React, { useState } from "react";
import Completed from './resources/completed.svg';
import ToDo from './resources/todo.svg';

import "./Tasks.css"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";

interface Task
{
    text: string;
    isComplete: boolean;
}


export const Tasks = () => {

    const [tasks, setTasks] = useState([] as Task[]);

    useState(()=>
    {
        setTasks([
            {text: "Pick up milk from the store", isComplete: true},
            {text: "Wash the car", isComplete: true},
            {text: "Pay electrical bill ", isComplete: false},
            {text: "Hand in assignment", isComplete: false},
            {text: "Make reservations at Pizzaria Italia for 7:00", isComplete: false},
            {text: "Mow the lawn", isComplete: false},
        ]);
    });




    const TaskItem = (task: Task, index:number) => {
        return(
            <Grid container direction="row"  className="task-item">
                <button onClick={() => 
                    {
                        let list = [...tasks];
                        list[index].isComplete = !list[index].isComplete;
                        setTasks(list);
                    }}>
                    <img className="complete-button"src={task.isComplete ? Completed : ToDo } />
                </button>
                <p>{task.text}</p>
            </Grid>
        )
    }


    return(
        <Grid container direction="row">
            <div className="header">
                <p className="task-number">{tasks.length}</p>
                <p className="task-small">Tasks</p> 
            </div>
            <div className="task-list">
                {tasks.map((item, index) => {
                    if(item.isComplete)
                        return (TaskItem(item, index));
                    return null;
                })}
                <div className="divider"></div>
                {tasks.map((item, index) => {
                    if(!item.isComplete)
                        return (TaskItem(item, index));
                    return null;
                })}
            </div>
        </Grid>
    );




}


export default Tasks; 