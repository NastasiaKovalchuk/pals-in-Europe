import { useEffect, useState } from "react";
import { Order } from "../../../redux/initState";
import { HeaderMaster } from "../HeaderMaster.tsx/HeaderMaster";
import css from '../Master.module.css'
import { useDispatch } from "react-redux";
// import { changeMasterOrderStatusAC } from "../../../redux/actionCreators/mastersAC";

export const OrdersMaster = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [changeStatus, setChangeStatus] = useState('Pending');
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getMasterOrders = async () => {
      const response = await fetch("http://localhost:8080/master/orders", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      const result = await response.json();
      // console.log('getUserOrders ===>', result);
      setOrders(result.masterOrders)
    };
    getMasterOrders();
  }, []);

  const onChangeStatusAccepted = async (event: any) => {
    event.preventDefault();
    const id = event.target.value;
    console.log('===========', id, '===========', changeStatus);
    setChangeStatus('Accepted')
    console.log('===========', id, '===========', changeStatus);
    const response = await fetch(`http://localhost:8080/master/changeStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, changeStatus }),
      credentials: "include",
    });
    const result = await response.json();
    setOrders(result);
  }

  const onChangeStatusDeclined = async (event: any) => {
    event.preventDefault();
    const id = event.target.value;
    setChangeStatus('Declined')
    const response = await fetch(`http://localhost:8080/master/changeStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, changeStatus }),
      credentials: "include",
    });
    const result = await response.json();
    setOrders(result);
  }

  const onChangeStatusFullfilled = async (event: any) => {
    event.preventDefault();
    const id = event.target.value;
    setChangeStatus('Fullfilled')
    const response = await fetch(`http://localhost:8080/master/changeStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, changeStatus }),
      credentials: "include",
    });
    const result = await response.json();
    setOrders(result);
  }

  return (
    <div className={css.masterAccount}>
      <div className={css.link}>
        <HeaderMaster />
      </div>
      <h4>My orders</h4>
      {orders ?
        orders.map((order, index) => (
          <div className={css.orderCard} key={index}>
            <div className={css.orderInfo}><span>Order information:</span>
              <div>№ {order.number},
                date of creation: {order.createdAt.slice(0, 10)}</div>
            </div>
            {order.status === 'Pending' ?
              <>
                <div className={css.orderInfo}>
                  <div className={css.status}>status: {order.status}</div>

                </div>
                <div><span>Client:</span>
                  <div><span>Name: </span>{order.client.name}, <span>email:</span> {order.client.email}</div>
                </div>
                <div><span>Service request:</span>
                  <div>Date: {order.date},
                    service: {order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button onClick={onChangeStatusAccepted} value={order._id} className={css.accepted}>Accepted</button>
                  <button onClick={onChangeStatusDeclined} value={order._id} className={css.declined}>Declined</button>
                  <button onClick={onChangeStatusFullfilled} value={order._id} className={css.fullfilled}>Fullfilled</button>
                </div>

              </>
              : <> </>
            }
            {order.status === 'Accepted' ?
              <>
                <div className={css.orderInfo}>
                  <div className={css.accepted} style={{width: '200px'}}>status: {order.status}</div>
                </div>
                <div><span>Client:</span>
                  <div><span>Name: </span>{order.client.name}, <span>email:</span> {order.client.email}</div>
                </div>
                <div><span>Service request:</span>
                  <div>Date: {order.date},
                    service: {order.service}
                  </div>
                </div>
                <div className={css.chooseStatus}>
                  <button onClick={onChangeStatusDeclined} value={order._id} className={css.declined}>Declined</button>
                  <button onClick={onChangeStatusFullfilled} value={order._id} className={css.fullfilled}>Fullfilled</button>
                </div>
              </> : <></>
            }
            {order.status === 'Declined' ?
              <>
                <div className={css.orderInfo}>
                  <div className={css.declined} style={{width: '200px'}}>status: {order.status}</div>
                </div>
                <div><span>Client:</span>
                  <div><span>Name: </span>{order.client.name}, <span>email:</span> {order.client.email}</div>
                </div>
                <div><span>Service request:</span>
                  <div>Date: {order.date},
                    service: {order.service}
                  </div>
                </div>
              </> : <></>
            }
            {order.status === 'Fullfilled' ?
              <>
                <div className={css.orderInfo}>
                  <div className={css.fullfilled} style={{width: '200px'}}>status: {order.status}</div>
                </div>
                <div><span>Client:</span>
                  <div><span>Name: </span>{order.client.name}, <span>email:</span> {order.client.email}</div>
                </div>
                <div><span>Service request:</span>
                  <div>Date: {order.date},
                    service: {order.service}
                  </div>
                </div>
              </> : <></>
            }
          </div>
        ))

        :
        <div>You have no orders</div>
      }
    </div >
  );
};
