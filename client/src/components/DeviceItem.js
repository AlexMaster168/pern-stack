import "../styles/style.css"
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {ABOUT_ROUTE, DEVICE_ROUTE} from "../utils/consts";
import UpdateDevice from "./modals/UpdateDevice";

const DeviceItem = ({device}) => {
    const history = useHistory()
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});
    const [show, setShow] = useState(false);

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({x: event.pageX, y: event.pageY});
            setShow(true);
        },
        [setAnchorPoint, setShow]
    );

    const handleClick = useCallback(() =>
        (show ? setShow(false) : null), [show]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });
    return (
        <>
            <Col md={3} className={"mt-3"} onDoubleClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
                <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                    <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div>Samsung...</div>
                        <div className="d-flex align-items-center">
                            <div>{device.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    <div>{device.name}</div>
                    <p>Цена: <b className='text-danger'>{new Intl.NumberFormat().format(device.price)}</b></p>
                    <Button className='mt-3'
                            variant={"outline-warning"}
                            disabled='true'
                            onClick={() => setDeviceVisible(true)}
                    >Изменить
                    </Button>
                    <UpdateDevice
                        id={device.id}
                        show={deviceVisible}
                        onHide={() => setDeviceVisible(false)}
                    />
                </Card>
            </Col>

            {show && (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x
                    }}
                >
                    <Button variant={"outline-info"} onClick={() => history.push(ABOUT_ROUTE)}>Инфо</Button>
                </ul>
            )}
        </>
    );
};

export default DeviceItem;
