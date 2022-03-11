import React, {useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import RemoveBrand from "../components/modals/RemoteBrand";
import RemoveType from "../components/modals/RemoteType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [brandRemoveVisible,setBrandRemoveVisible] = useState(false);
    const [typeRemoveVisible,setTypeRemoveVisible] = useState(false);

    return (
        <Container className="mt-2">
            <Row style={{backgroundColor: 'orange',color: '#FFF'}}>
            <Button
                variant={"outline-dark"}
                className="mt-1 p-2 mr-3"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-1 p-2 mr-3"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-1 p-2 mr-3"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            </Row>
            <Row style={{backgroundColor: '#111430',color: '#FFF'}}>
                <Button
                    onClick={() => setTypeRemoveVisible(true)}
                    variant={"outline-danger"}
                    className="p-2 mt-1 mr-3"
                >
                    Удалить тип</Button>
                <Button
                    onClick={() => setBrandRemoveVisible(true)}
                    variant={"outline-danger"}
                    className="p-2 mt-1 mr-3"
                >
                    Удалить бренд</Button>
            </Row>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <RemoveBrand show={brandRemoveVisible} onHide={() => setBrandRemoveVisible(false)}/>
            <RemoveType show={typeRemoveVisible} onHide={() => setTypeRemoveVisible(false)}/>
        </Container>
    );
};

export default Admin;
