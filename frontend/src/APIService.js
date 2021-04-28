export default class APIService {
    static loginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .catch(error => console.log(error))
    }

    static registerUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .catch(error => console.log(error))
    }

    static createOrder(body, token) {
        return fetch(`http://127.0.0.1:8000/api/orders/`, {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .catch(error => console.log(error))
    }

    static updateOrder(order_id, body, token) {
        return fetch(`http://127.0.0.1:8000/api/orders/${order_id}/`, {
            "method": "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .catch(error => console.log(error))
    }

    static deleteOrder(order_id, token) {
        return fetch(`http://127.0.0.1:8000/api/orders/${order_id}/`, {
            "method": "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        })
        .catch(error => console.log(error))
    }

    // static orderDetails(order_id, token) {
    //     return fetch(`http://127.0.0.1:8000/api/orders/${order_id}/`, {
    //         "method": "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(res => res.json())
    //     .catch(error => console.log(error))
    // }
}