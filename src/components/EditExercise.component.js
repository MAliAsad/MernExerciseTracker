
import {useState,useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditExercise = (props) => {

    const[username,setUsername]=useState("");
    const[description,setDescription]=useState("");
    const[duration,setDuration]=useState(0);
    const[date,setDate]=useState(new Date());
    const[users,setUsers]=useState([]);

    useEffect(()=>{

        axios.get("http://localhost:5000/api/exercises/"+props.match.params.id).then(res=>{
            setUsername(res.data.username);
            setDescription(res.data.description);
            setDuration(res.data.duration);
            setDate(new Date(res.data.date));
        }).catch(err=>console.log(err));

        axios.get("http://localhost:5000/api/users").then(res=>{
            if(res.data.length>0){
                setUsers(res.data.map(user=>user.username));
            }
        })
    },[]);

    const onSubmit= (e)=>{
        e.preventDefault();
        const exercise={
            username: username,
            description: description,
            duration: duration,
            date:date
        };
        console.log(exercise);

        axios.put("http://localhost:5000/api/exercises/"+props.match.params.id,exercise).then(res=>console.log(res.data));
        window.location="/";
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
            
                <div className="form-group">
                    <label>Username: </label>
                    <select required className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} >
                        {users.map((user)=>{
                            return (<option key={user} value={user}>
                                {user}
                            </option>)
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" required className="form-control" value={duration} onChange={(e)=>setDuration(e.target.value)} />
                </div>

                <div className="form-group">
                        <DatePicker selected={date} onChange={()=>setDate(date)} />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />                  
                </div>

            </form>
        </div>
    )
}

export default EditExercise
