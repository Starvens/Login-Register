import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// Layouts
import Header from '../_layouts/Header';

// Components
import AddForm from './_components/AddForm';
import UpdateForm from './_components/UpdateForm';
import UserTable from './_components/UserTable';


export default function Home() {

    const [refresh, setRefresh] = useState(true);

    const [user, setUser] = useState({});
    return (
        <div>
            <Header />
            <Container>
                <AddForm setRefresh={setRefresh} refresh={refresh} />
                <hr></hr>

                <UpdateForm user={user} setRefresh={setRefresh} refresh={refresh} />
                <hr></hr>

                <UserTable refresh={refresh} setUser={setUser} />
            </Container>
        </div>
    )
}
