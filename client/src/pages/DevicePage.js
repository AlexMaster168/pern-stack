import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useHistory, useParams} from 'react-router-dom'
import {deleteOneDevice, fetchOneDevice} from "../http/deviceAPI";
import {DEVICE_ROUTE} from "../utils/consts";

const DevicePage = () => {
    const history = useHistory()
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const deleteDevice = async () => {
        const sure = window.confirm(`Вы уверены, что хотите удалить ${device.name}`)
        if (sure) {
            await deleteOneDevice(device.id)
        }
    }

    return (
            <Container className="mt-3">
                <Row>
                    <Col md={4}>
                        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                    </Col>
                    <Col md={4}>
                        <Row className="d-flex flex-column align-items-center">
                            <h2>{device.name}</h2>
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    background: `url(${bigStar}) no-repeat center center`,
                                    width: 240,
                                    height: 240,
                                    backgroundSize: 'cover',
                                    fontSize: 64
                                }}
                            >
                                {device.rating}
                            </div>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Card
                            className="d-flex flex-column align-items-center justify-content-around"
                            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                        >
                            <h3>От: {new Intl.NumberFormat().format(device.price)} грн.</h3>
                            <Button variant={"outline-dark"}>Добавить в корзину</Button>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex flex-column m-3">
                    <h1>Характеристики</h1>
                    {device.info.map((info, index) =>
                        <Row key={info.id}
                             style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                            {info.title}: {info.description}
                        </Row>
                    )}
                </Row>
                <Button className='mr-3' variant={"outline-info"} onClick={() => history.push(DEVICE_ROUTE)}>Вернутся к товарам</Button>
                <Button variant={"outline-danger"} onClick={deleteDevice}>Удалить</Button>
            </Container>
    );
};

export default DevicePage;
