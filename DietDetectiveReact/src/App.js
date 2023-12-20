import React, {useContext, useEffect} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from 'react-router-dom';
import {autoLogin} from './util/APIUtils';
import AuthContext from './context/AuthProvider';
import RootLayout from "./layouts/RootLayout";
import Main from "./pages/Main";
import PrivateRoute from "./common/PrivateRoute";
import Monitor from "./pages/Monitor";
import Meal from "./pages/Meal";
import Recipes from "./pages/Recipes";
import Interview from "./pages/Interview";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Water from "./pages/Water";
import NotFound from "./components/NotFound";
import RecipesDetail from "./pages/RecipesDetail";
import OpenAIForm from "./pages/Assistant";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Main />} />
            <Route path="monitor" element={<PrivateRoute><Monitor/></PrivateRoute>} />
            <Route path="meal" element={<PrivateRoute><Meal/></PrivateRoute>} />
            <Route path="recipes" element={<PrivateRoute><Recipes/></PrivateRoute>} />
            <Route path="recipes/:id" element={<RecipesDetail />} />
            <Route path="interview" element={<PrivateRoute><Interview/></PrivateRoute>} />
            <Route path="account" element={<PrivateRoute><Account/></PrivateRoute>} />
            <Route path="water" element={<PrivateRoute><Water/></PrivateRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="chat" element={<PrivateRoute><OpenAIForm/></PrivateRoute>} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/roboto.txt"  />
        </Route>
    )
);

function App() {
    const {auth, setAuth} = useContext(AuthContext);

    const loadCurrentlyLoggedInUser = () => {
        autoLogin()
            .then((response) => {
                setAuth({
                    isAuthenticated: true,
                    currentUser: response.data,
                    isInterviewCompleted: response.data.interviewCompleted,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadCurrentlyLoggedInUser();
    }, []);

    return <RouterProvider router={router}/>;
}

export default App;
