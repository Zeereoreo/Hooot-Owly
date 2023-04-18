import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import owltime  from '../owltime.png'

const TopNavloggedTemplate = styled.div`
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;

    min-width: auto;
    width: 100%;
    height: 173px;
    background: linear-gradient(45deg, #9D5353, #4F3F48);;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
`

const TopNavloggedInput = styled.input`
    padding: 10px;
    width: 80rem;
    height: 2rem;
    background-color: #F8F3E6;
`


const TopNavlogged = () => {
    return (
        <>
                <TopNavloggedTemplate>
                <Link to = '/'><img src={owltime} alt='logo image'/></Link>
                    <TopNavloggedInput
                    type='text'
                    placeholder='Search'
                    ></TopNavloggedInput>
                    <AiOutlineSearch size={100} color='#F8F8F8'></AiOutlineSearch>
                    <Link to = '/login'><FaRegUserCircle size={50} color='#F8F8F8'/></Link>
                    <Link to = '/signup'><MdLogout size={50} color='#F8F8F8'/></Link>
                    <AiOutlineQuestionCircle size={100} color='#F8F8F8'/>
                </TopNavloggedTemplate>
        </>


    )
}

export default TopNavlogged;