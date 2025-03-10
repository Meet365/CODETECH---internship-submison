import React from "react";

import { Refine, LegacyAuthProvider as AuthProvider } from "@refinedev/core";
import { notificationProvider, RefineSnackbarProvider, ReadyPage, ErrorComponent } from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import {
    BookOutlined,
    StarBorderOutlined,
    CalendarMonthOutlined,
    ShoppingCartOutlined,
    AccountCircleOutlined,
} from "@mui/icons-material";

import dataProvider from "@refinedev/simple-rest";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";

import {
    Login,
    Home,
    AllRecipes,
    RecipeDetails,
    CreateRecipe,
    EditRecipe,
    MyProfile,
    SavedRecipes,
    VisitProfile,
    MealPlan,
    ShoppingList,
} from "pages";

import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (request.headers) {
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});

function App() {
    const authProvider: AuthProvider = {
        login: async ({ credential }: CredentialResponse) => {
            const profileObj = credential ? parseJwt(credential) : null;

            // Save user to MongoDB
            if (profileObj) {
                const response = await fetch(
                    `http://localhost:8080/api/v1/users`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: profileObj.name,
                            email: profileObj.email,
                            avatar: profileObj.picture,
                        }),
                    }
                );
                const data = await response.json();

                if (response.status === 200) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...profileObj,
                            avatar: profileObj.picture,
                            userId: data._id,
                        })
                    );
                } else {
                    return Promise.reject();
                }
            }

            localStorage.setItem("token", `${credential}`);

            return Promise.resolve();
        },
        logout: () => {
            const token = localStorage.getItem("token");

            if (token && typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                axios.defaults.headers.common = {};
                window.google?.accounts.id.revoke(token, () => {
                    return Promise.resolve();
                });
            }

            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            const token = localStorage.getItem("token");

            if (token) {
                return Promise.resolve();
            }
            return Promise.reject();
        },

        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return Promise.resolve(JSON.parse(user));
            }
        },
    };

    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    dataProvider={dataProvider(
                        "http://localhost:8080/api/v1"
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "recipes",
                            list: AllRecipes,
                            show: RecipeDetails,
                            create: CreateRecipe,
                            edit: EditRecipe,
                            icon: <BookOutlined />,
                        },
                        {
                            name: "saved",
                            meta: {
                                label: "Saved",
                            },
                            list: SavedRecipes,
                            icon: <StarBorderOutlined />,
                        },
                        {
                            name: "meal-plan",
                            meta: {
                                label: "Meal Plan",
                            },
                            list: MealPlan,
                            icon: <CalendarMonthOutlined />,
                        },
                        {
                            name: "shopping-list",
                            meta: {
                                label: "Shopping List",
                            },
                            list: ShoppingList, 
                            icon: <ShoppingCartOutlined />,
                        },
                        {
                            name: "profile",
                            meta: { 
                                label: "Profile",
                            },
                            list: MyProfile,
                            show: VisitProfile,
                            icon: <AccountCircleOutlined />,
                        },
                    ]}
                    Title={Title}
                    Sider={Sider}
                    Layout={Layout}
                    Header={Header}
                    legacyRouterProvider={routerProvider}
                    legacyAuthProvider={authProvider}
                    LoginPage={Login}
                    DashboardPage={Home}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
}

export default App;
