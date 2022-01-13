import React, {useState, useEffect} from "react"
import {API_KEY, API_URL} from '../config';
import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import {Alert} from './Alert';

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: 'b7d66371-c3c30bcb-f447369f-30ea57e4',
            }, //передача инфы, headers
        }).then(response => response.json()).then(data => {
            data.featured && setGoods(data.featured); //получаем нужный ключ по API
            setLoading(false);
        })
    }, []);

    const addToCart = (item) => { // в item идет инфа о количестве добавленных товаров
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id); //обходит orderItem
        
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]); //возвращает товары лежащие в order и если товар еще не добавлен, добавляет новый item
        } else {
            const newOrder = order.map((orderItem, index) => { // перебираем наш массив
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem;
                }
            });

            setOrder(newOrder);
        }
        setAlertName(item.name);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    }

    const minusQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                };
            } else {
                return el
            }
        });
        setOrder(newOrder)
    }

    const addQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity
                }
            } else {
                return el
            }
        });
        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    return <main className="container content">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
        {
            loading ? <Preloader/> : <GoodsList goods={goods} addToCart={addToCart} />
        }
        {
            isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} addQuantity={addQuantity} minusQuantity={minusQuantity} />
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert} />
        }
    </main>
}

export {Shop}