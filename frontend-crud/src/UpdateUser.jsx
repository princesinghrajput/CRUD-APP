import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

const UpdateUser = () => {
    const {id}=useParams();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const navigate=useNavigate()

    //use effect hook to update
    useEffect(() => {
        axios.get("http://localhost:8000/getUser/"+id)
            .then(result => {console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
            
            })
            .catch(err => console.log(err))
    }, [])

    //submit the form
    const update = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            age: age
        }
        axios.put("http://localhost:8000/updateUser/"+id, {name, email, age})
         .then(result => {
                console.log(result)
                navigate('/')
            })
         .catch(err => console.log(err))
    }

  return (
    <div>
        <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={update}>
                <h1>Update User</h1>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label>Age</label>
                    <input type="text" className="form-control" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success">Update</button>
            </form>


        </div>
      </div>

    </div>
  )
}

export default UpdateUser