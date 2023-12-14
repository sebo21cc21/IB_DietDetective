import { API_BASE_URL, ACCESS_TOKEN } from '../constans';
import axios from "axios";


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function autoLogin() {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
        return Promise.reject("No access token set.");
    }

    return axios.get(`${API_BASE_URL}/auth/validate`, {
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    });
}
export function handleDeleteEatenMeal(mealId) {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
        return Promise.reject("No access token set.");
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.delete(`${API_BASE_URL}/eaten-meals/${mealId}`, config);
}
export function handleSetWeight(requestBody) {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
        return Promise.reject("No access token set.");
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.post(`${API_BASE_URL}/weight`, requestBody, config);
}

export function handleSetTargetWeight(requestBody) {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
        return Promise.reject("No access token set.");
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.post(`${API_BASE_URL}/users/target`, requestBody, config);
}

export function handleFinishInterview(requestBody) {

    const token = localStorage.getItem(ACCESS_TOKEN);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.post(`${API_BASE_URL}/users/survey`, requestBody, config);

}

export function handleWater(requestBody) {

    const token = localStorage.getItem(ACCESS_TOKEN);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.post(`${API_BASE_URL}/water`, requestBody, config);

}
export function handleEaten(requestBody) {

    const token = localStorage.getItem(ACCESS_TOKEN);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.post(`${API_BASE_URL}/eaten-meals`, requestBody, config);

}

export function handleGoal(requestBody) {

    const token = localStorage.getItem(ACCESS_TOKEN);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    return axios.put(`${API_BASE_URL}/users/goal`, requestBody, config);

}
export function getWater() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/water`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}

export function getEaten() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/eaten-meals/today`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}

export function getEatenSummary() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/eaten-meals/summary`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}
export function getWaterToday() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/water/today`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}

export function getCurrentUser() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}

export function getUserSummary() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/users/summary`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
}

export function getMeals(id) {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/meals/category/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
}

export function getMeal(id) {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/meals/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
}
export function getCategoryName() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/categories`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
}



export function getUserWeight() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return axios.get(`${API_BASE_URL}/weight`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/authenticate",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest) {
    return axios.post(`${API_BASE_URL}/auth/register`, registerRequest, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem(ACCESS_TOKEN, response.data.token);
        }
        return response.data;
    }).catch(error => {
        return Promise.reject(error.response || error.message);
    });
}