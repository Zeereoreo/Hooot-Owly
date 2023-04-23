import { Button } from "react-bootstrap"
import styled from "styled-components"
import { UpdateButton } from "../../../styles/UIStyles";


const CommentWrap = styled.div`
    padding: 10px;
    width: 750px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 2px solid white;
`

const CommentDetail = styled.div`
    padding: 10px;
    width: 60vw;
`

const CommentUser = styled.div`
    padding: 10px;
    width: 20vw;
`

const CommentDate = styled.div`
    padding: 10px;
    width: 20vw;
`

const CommentCreated = ({comment, deleteAnswerCommentHandler})=>{

    // console.log(comment.member)
    const deleteClickHandler = (e) => {
        e.stopPropagation();
        console.log("comment delete clicked!");
        deleteAnswerCommentHandler(comment.id);
    }

    return(
        <>
        <CommentWrap>
            <CommentDetail>{comment.content}</CommentDetail>
            <CommentUser>{comment.member.displayName}</CommentUser>
            <CommentDate>{comment.updateDate}</CommentDate>
            <UpdateButton>수정</UpdateButton>
            <UpdateButton onClick={deleteClickHandler}>삭제</UpdateButton>
        </CommentWrap>
        </>

    )
}

export default CommentCreated