import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {fetchBrands, fetchOneDevice, fetchTypes, updateOneDevice} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const UpdateDevice = observer(({show, onHide, id}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(1)

    useEffect(async() => {
        const deviceById = await fetchOneDevice(id)
        setName(deviceById.name)
        setPrice(deviceById.price)
        setRating(deviceById.rating)
    }, [])


    const updateDevice = () => {
        updateOneDevice(name, rating, price, id).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3 mb-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Group>
                        <Form.Label>Введите стоимость устройства</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-3"
                            placeholder="Введите стоимость устройства"
                            type="number"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="mr-2">Введите рейтинг товара</Form.Label>
                        <Form.Control
                            className="mt-3"
                            type="number"
                            value={rating}
                            placeholder="Введите рейтинг товара"
                            onChange={e => setRating(Number(e.target.value))}
                        />
                    </Form.Group>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updateDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateDevice;