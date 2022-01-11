import React from 'react';
import "../styles/style.css"
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import {SHOP_ROUTE} from "../utils/consts";

export const About = () => {
    const history = useHistory()
    return (
            <div className='About'>
                <div className='textBlock'>
                    <h1> Это приложение создал Алексей Сильвейструк</h1>
                    <Button variant={"outline-danger"} onClick={() => history.push(SHOP_ROUTE)}>Перейти к товарам</Button>
                </div>
            </div>
    );
};