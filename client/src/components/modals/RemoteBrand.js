import React, {useState} from 'react'
import { Modal,Button,Form } from 'react-bootstrap';
import {deleteBrand} from "../../http/deviceAPI";

const RemoveBrand = ({show,onHide}) => {
    const [id, setId] = useState(0)
    const remoteBrands = async () => {
        console.log(id)
        await deleteBrand(id)
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
                    Удалить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={id} onChange={e => Number(setId(e.target.value))} placeholder={"Введите бренд id"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={remoteBrands}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemoveBrand