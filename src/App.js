import './App.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import About from './pages/About/About';
import AboutZhchs from './pages/About/AboutZhchs';
import Contact from './pages/Contact/Contact';
import ContactZhchs from './pages/Contact/ContactZhchs';
import Footer from './components/Footer/Footer';
import FooterZhchs from './components/Footer/FooterZhchs';
import Header from './components/Header/Header';
import HeaderZhchs from './components/Header/HeaderZhchs';
import Main from './pages/Main';
import Product from './pages/Product/Product';
import ProductZhchs from './pages/Product/ProductZhchs';
import Sending from './pages/Sending/Sending';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarZhchs from './components/Sidebar/SidebarZhchs';
import Support from './pages/Support/Support';
import SupportZhchs from './pages/Support/SupportZhchs';
import Zhchs from './pages/zh-chs/MainZhchs';

function App() {
    const lang = navigator.language.toLowerCase().substring(0.2);
    const navigate = useNavigate();
    useEffect(() => {
        if (lang === "zh-cn") {
            if (window.location.href.indexOf("zh-chs") !== -1) {
                return !1;
            } else {
                navigate("/Zh-chs");
            }
        }
    }, []);

    const [sending, setSending] = useState(false);

    const Layout = ({ children }) => {
            return ( <
                div > { sending && < Sending / > } <
                Header / >
                <
                Sidebar / >
                <
                Routes >
                <
                Route path = '/'
                element = { < Main / > }
                /> <
                Route path = '/about'
                element = { < About / > }
                /> <
                Route path = '/product'
                element = { < Product / > }
                /> <
                Route path = '/support'
                element = { < Support / > }
                />   <
                Route path = '/contact'
                element = { < Contact setSending = { setSending }
                    />} / >
                    <
                    /Routes> <
                    Footer / >
                    <
                    /div>
                );
            };

            const LayoutChina = ({ children }) => {
                    return ( <
                        div >

                        <
                        HeaderZhchs / >
                        <
                        SidebarZhchs / >
                        <
                        Routes >
                        <
                        Route path = '/Zh-chs'
                        element = { < Zhchs / > }
                        /> <
                        Route path = '/aboutZhchs'
                        element = { < AboutZhchs / > }
                        /> <
                        Route path = '/productZhchs'
                        element = { < ProductZhchs / > }
                        /> <
                        Route path = '/supportZhchs'
                        element = { < SupportZhchs / > }
                        /> <
                        Route path = '/contactZhchs'
                        element = { < ContactZhchs setSending = { setSending }
                            />} / >
                            <
                            /Routes> <
                            FooterZhchs / >
                            <
                            /div>
                        );
                    };

                    return ( <
                            div className = "App" > { sending && < Sending / > } <
                            Routes >
                            <
                            Route element = { < Layout / > } >
                            <
                            Route path = '/'
                            element = { < Main / > }
                            /> <
                            Route path = '/about'
                            element = { < About / > }
                            /> <
                            Route path = '/product'
                            element = { < Product / > }
                            /> <
                            Route path = '/support'
                            element = { < Support / > }
                            />   <
                            Route path = '/contact'
                            element = { < Contact setSending = { setSending }
                                />} / >
                                <
                                /Route> <
                                Route element = { < LayoutChina / > } >
                                <
                                Route path = '/Zh-chs'
                                element = { < Zhchs / > }
                                /> <
                                Route path = '/aboutZhchs'
                                element = { < AboutZhchs / > }
                                /> <
                                Route path = '/productZhchs'
                                element = { < ProductZhchs / > }
                                /> <
                                Route path = '/supportZhchs'
                                element = { < SupportZhchs / > }
                                /> <
                                Route path = '/contactZhchs'
                                element = { < ContactZhchs setSending = { setSending }
                                    />} / >


                                    <
                                    /Route> <
                                    /Routes> <
                                    /div>
                                );
                            }

                            export default App;