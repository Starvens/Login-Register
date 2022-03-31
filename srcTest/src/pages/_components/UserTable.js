import React, { useState, useEffect } from 'react';

// Bootstrap
import { Table, Button } from 'react-bootstrap';

// HTTP
import http from '../_utils/http';

export default function UserTable({ refresh, setUser }) {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        http.get('employee', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(function (response) {
                setUsers(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const deleteUser = (id) => {
        http.delete(`employee/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(function (response) {
                getUsers();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        getUsers()
    }, [refresh])

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Button variant="primary" onClick={() => { setUser(user) }}>Update</Button>
                                    {' '}
                                    <Button variant="danger" onClick={() => { deleteUser(user._id) }}>Delete</Button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
