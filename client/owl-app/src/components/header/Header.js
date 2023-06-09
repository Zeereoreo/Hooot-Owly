import styled from "styled-components";
import TopNav from "./TopNav";
import TopNavlogged from "./TopNavlogged";
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../../utils/UserContextConfig";

const HeaderBlock = styled.header`
    display: flex;
    justify-content: center;
    ${'' /* align-items: flex-start; */}
    position: fixed;
    top : 0;
    left : 0;
    width: 100%;
    height: 100px;
    z-index: 1000;
    background: linear-gradient(45deg, #9D5353, #4F3F48);
`

const HeaderWrap = styled.div`
    width: 100%;
    height: 100%;
`

const Header = ({threads, setSidebarStatus}) => {

    const location = useLocation();
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const clickRouteHandler = (pathName) => {
        if (pathName === 'Home') {
            setSidebarStatus({homeOn: true, tagsOn: false, usersOn: false, qOn: false
            });
            // navigate(0);
        }
        if (pathName === 'Question') {setSidebarStatus({
            homeOn: false, tagsOn: false, usersOn: false, qOn: true}
            );
}
    }

    useEffect(() => {
        if (location.pathname === '/' && threads) {
            clickRouteHandler('Home');
        }
        if (location.pathname.includes('/questions')){
            // console.log('routed to question page!');
            clickRouteHandler('Question');
        }
    }, [location]);

    return(
        <HeaderBlock>
            <HeaderWrap >
                {isLoggedIn ? <TopNavlogged /> : <TopNav /> }
            </HeaderWrap>
        </HeaderBlock>
 )
}

export default Header