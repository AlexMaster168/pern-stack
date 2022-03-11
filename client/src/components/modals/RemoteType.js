import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap';
import {deleteType} from "../../http/deviceAPI";

const RemoveType = ({show, onHide}) => {
    const [id, setId] = useState(0)
    const remoteTypes = async () => {
        await deleteType(id)
        onHide()
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={id} onChange={e => Number(setId(e.target.value))} placeholder={"Введите тип id"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={remoteTypes}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemoveType