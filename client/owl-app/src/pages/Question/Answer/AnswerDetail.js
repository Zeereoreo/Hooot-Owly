import styled from "styled-components";


const AnswerBlock = styled.div`
    display: flex;
    padding: 10px;
`

const AnswerContent = styled.div`
    padding: 10px;
    width: 600px;
    color: white;
`
const CreateUserA = styled.div`
    padding-top: 60px;
    width: 130px;
    height: 100px;
    font-size: 15px;
`


const AnswerDetail = ({answers})=>{


    
    return (
        <AnswerBlock>
            <AnswerContent>{answers.content}</AnswerContent>
            <CreateUserA>{answers.member}</CreateUserA>
        </AnswerBlock>

        )
}

export default AnswerDetail