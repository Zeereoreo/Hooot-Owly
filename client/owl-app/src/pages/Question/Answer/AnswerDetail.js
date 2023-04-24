import styled from "styled-components";
import AddAnswerComment from "../Comment/AddAnswerComment";
import AnswerCommentList from '../Comment/AnswerCommentList'
import { UpdateButton } from "../../../styles/UIStyles";
import { useState } from "react";
import axios from 'axios';
import AnswerPatch from "./AnswerPatch";

const AnswerBlock = styled.div`
    display: flex;
    padding: 10px;
    flex-direction: column;
    color: white;
    z-index: 100;
`

const AnsweruserBlock = styled.div`
    display: flex;
    padding: 10px;
    border-bottom: 1px solid white;
    align-items: center;
`

const AnswerContent = styled.div`
    padding: 10px;
    width: 600px;
    color: white;
`
const CreateUserA = styled.div`
    padding-top: 60px;
    width: 130px;
    font-size: 15px;
`

const EditorInput =styled.input`
    height: 400px;
    width: 100%;
`

const ReviseButton = styled(UpdateButton) `
    ${'' /* height: 10%; */}
    background: var(--colors-darkred);
`

const AnswerDetail = ({ q_id, answer, answers, updateAnswerHandler, deleteAnswerHandler, isLoggedIn, openModal }) => {

    const [answerComments, setAnswerComments] = useState((answer.answerReplies ? answer.answerReplies : []));
    // const answerCommentsNum = answer.answerReplies ? answer.answerReplies.length : 0;
    const url_patch = `http://localhost:3001/questions/${q_id}`;
    console.log(answer.member.displayName)

    const addAnswerCommentHandler = (newComment) => {
        setAnswerComments([...answerComments, newComment]);
        const newAnswerReplies = [...answerComments, newComment]; //set함수는 다음렌더링되서야 업데이트를 하기 때문에!

        const newAnswers = answers.map(el => {
            // console.log("date: ", el.createdDate); //date를 나중에 id로 대치!
            if (el.id === answer.id) {
                if (el.answerReplies) {
                    el.answerReplies = [...newAnswerReplies];
                }
                // console.log("result:", el.answerReplies);
            }
            return el;
        });



        if (answer.answerReplies) {
            axios.patch(url_patch, { "answers": newAnswers })
                .then(res => { console.log("answerReplies patch success!", res) })
                .catch(err => { console.log("answerReplies patch fail!", err) })
        } else {
            console.log("there are no answerReplies ready!"); //이럴 경우는 없을 듯!
            axios.patch(url_patch, { "answers": newAnswers })
            .then(res => { console.log("answerReplies patch success!", res) })
            .catch(err => { console.log("answerReplies patch fail!", err) })
        }
    }

    const deleteClickHandler = (e) => {
        //삭제 전 묻기 - 진짜 삭제하고 싶으신가요?
        e.stopPropagation();
        deleteAnswerHandler(answer.id);
    }

    const updateAnswerCommentHandler = (comment_id, updatedComment) => {
        console.log('update answer comment being handled!');
        const newComments = answerComments.map((el) => {
            if (el.id === comment_id) el.content = updatedComment;
            return el;
        })

        setAnswerComments(newComments);
        console.log("newcomments:", newComments);

        const newAnswers = answers.map(el => {
            if (el.id === answer.id){
                el.answerReplies = el.answerReplies.map(reply => {
                    if (reply.id === comment_id) reply.content = updatedComment;
                    return reply;
                })
            }
            return el;
        })
        console.log("newanswers:", newAnswers);

        axios.patch(url_patch, {"answers": newAnswers})
            .then((res) => {
                console.log("update answercomment success!", res);
            })
            .catch((err) => {
                console.log("update answercomment fail!", err);
            });
    }

    const deleteAnswerCommentHandler = (comment_id) => {
        console.log("the deleting actually happens here, comment id:", comment_id);
        const filteredAnswerComments = answerComments.filter(el => el.id !== comment_id);

        setAnswerComments(filteredAnswerComments);

        const newAnswers = answers.map(el => {
            if (el.id === answer.id){
                el.answerReplies = el.answerReplies.filter(reply => reply.id !== comment_id);
            }
            return el;
        })

        axios.patch(url_patch, {"answers": newAnswers})
            .then(res => { console.log("delete answercomment success!", res) })
            .catch(err => { console.log("delete answercomment fail!", err) })

    }
    const [isEditState, setIsEditState] = useState(false);
    const [updatedAnswer, setUpdatedAnswer] = useState(answer.content);

    const handleEditClick = ()=>{
        setIsEditState(true);
        updateAnswerHandler(answer.id, updatedAnswer)
        console.log("돼라:", updatedAnswer )
    }

    const onTextChange = (e) => {
        setUpdatedAnswer(e.target.value);
    }

    return (
        <>
            <AnswerBlock>
                <AnsweruserBlock>
        { isEditState ? <>
                    <EditorInput type="text" value={updatedAnswer} onChange={onTextChange} />
                    <ReviseButton >답변 수정하기</ReviseButton> </>:
                    <AnswerContent>{answer.content}</AnswerContent>}
                    <CreateUserA>{answer.member.displayName}</CreateUserA>
                    {isLoggedIn &&
                    <>
                    <ReviseButton onClick={handleEditClick}>수정</ReviseButton>
                    <ReviseButton onClick={deleteClickHandler}>삭제</ReviseButton>
                    </>}
                </AnsweruserBlock>

                <AnswerCommentList answerComments={answerComments}
                                    deleteAnswerCommentHandler={deleteAnswerCommentHandler}
                                    updateAnswerCommentHandler={updateAnswerCommentHandler}
                                    openModal={openModal}
                                    isLoggedIn={isLoggedIn}
                ></AnswerCommentList>
            </AnswerBlock>
            <AddAnswerComment addAnswerCommentHandler={addAnswerCommentHandler}
                              openModal={openModal}
                              isLoggedIn={isLoggedIn}
                              ></AddAnswerComment>
        </>


    )
}

export default AnswerDetail