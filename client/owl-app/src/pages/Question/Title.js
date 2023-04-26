import styled from "styled-components";
import { ClickButton,UpdateButton } from '../../styles/UIStyles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const TitleWrap = styled.div`
    width: 750px;
    padding: 20px;
    border-bottom: 2px solid #E7CC8F;
    display: flex;
    flex-direction: column;
`
const TitleBlock = styled.div`
    padding-top: 15px;
    height: 20px;
    display: flex;
    color: #E7CC8F;
`

const TitleName = styled.h1`
    padding-top: 10px;
    height: 60px;
    font-size: 24px;
`
const Stat = styled.span`
    width: 63.5px;

`
const Statbutton = styled.span`
    height: 20px;
    padding-left: 550px;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: var(--colors-yellow);
    padding-right: 6px;
`



const CreateDate = styled.div`

    width: 200px;
    height: 20px;
    font-size: 15px;
    display: flex;
    justify-content: space-around;
    color: #DACC96;
`
const convertDate = (string) => {
    return `${string.substring(0, 4)}년 ${String(Number(string.substring(5, 7)))}월 ${String(Number(string.substring(8, 10)))}일`
  }

const Title = ({question, isLoggedIn}) =>{

    


    return (
        <>
        <TitleWrap>
            <TitleName>{question.title}</TitleName>
            <Statbutton>
        {isLoggedIn? 
             <Link to ='/ask'>
                <ClickButton>Ask Anything</ClickButton>
             </Link> :
             <Link to = '/Login'>
                <ClickButton>Ask Anything</ClickButton>
             </Link>
             }
                </Statbutton>
            <TitleBlock>
            <CreateDate>{convertDate(question.createdDate)}</CreateDate>
            <Stat>
                    <StyledIcon icon={faBinoculars} />
                    <span>{question.viewCount}</span>
                </Stat>
                <Stat>
                    <StyledIcon icon={faCommentDots} />
                    <span>{question.answers?.length ? question.answers.length : 0}</span>
                </Stat>
            </TitleBlock>
            
        </TitleWrap>
        
        </>
    )
}

export default Title