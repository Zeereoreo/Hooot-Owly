import SideNav from '../components/SideNav';
import { Threads } from '../components/home/Threads';
import Tags from '../components/home/Tags';
import Users from '../components/home/Users';

import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';


const Main = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${'' /* height: 100vh; */}
    ${'' /* width: 100vw; */}
    width: 90%;
    margin: 0 auto;
    flex: 3 0 auto;
    position: relative;
    z-index: 900;
`




const Home = ({threads, isPending, toggleLogin, sidebarStatus, setSidebarStatus, isLoggedIn}) => {

    //for setting the tags/users pages
    const refContainer = useRef(null);
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    const dimensionsHandler = (width, height) => {
        setDimensions({width, height});
    }

    const clickSidebarHandler = (item) => {
        if (item === 'Home') setSidebarStatus({homeOn: true, tagsOn: false, usersOn: false, qOn: false});
        if (item === 'Tags') setSidebarStatus({homeOn: false, tagsOn: true, usersOn: false, qOn: false});
        if (item === 'Users') setSidebarStatus({homeOn: false, usersOn: false, usersOn: true, qOn: false});
    }

    return (
        <Main>
            <SideNav toggleLogin={toggleLogin}
                    sidebarStatus={sidebarStatus}
                    clickSidebarHandler={clickSidebarHandler}
                    isLoggedIn={isLoggedIn}/>
            {sidebarStatus.homeOn ? threads && <Threads threads={threads}
                                                        dimensionsHandler={dimensionsHandler}
                                                        refContainer={refContainer}/>
                                : null}
            {sidebarStatus.tagsOn ? <Tags dimensions={dimensions}/> : null}
            {sidebarStatus.usersOn ? <Users dimensions={dimensions}/> : null}
        </Main>
    )
}

export default Home;