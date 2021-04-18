

import axios from "axios"; 
import {useState,useEffect} from "react";
import Exercise from "./Exercise"

const ExerciseList = () => {
    
    const[exercises,setExercises]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/exercises").then(res=>{
            if(res.data.length>0){
                setExercises(res.data);
                console.log(exercises)
            }
        })
    },[]);

    const deleteExercise=(id)=>{
        axios.delete("http://localhost:5000/api/exercises/"+id).then(res=>console.log(res.data));
        setExercises(exercises.filter(exe=>exe._id!==id))
    }
    

    return (
        <div>
           <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exe=><Exercise exercise={exe} deleteExercise={deleteExercise} key={exe._id} />)}
                </tbody>
            </table>
        </div>
    )
}

export default ExerciseList
