import styled from "styled-components";
import CommentCreated from "./CommentCreated";


const CommentListWrap = styled.div`
    padding: 10px;
    height: 100%;
    width: 750px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

`

const AnswerCommentList = ({answerComments, deleteAnswerCommentHandler}) => {

    console.log(answerComments)

    return (
        <>
        <CommentListWrap>
            {answerComments && answerComments.map((comment, idx)=><CommentCreated comment={comment}
                                                                                    deleteAnswerCommentHandler={deleteAnswerCommentHandler}
                                                                                    key={idx} />)}
        </CommentListWrap>
        </>

    )
}

export default AnswerCommentList