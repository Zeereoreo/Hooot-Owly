import styled from "styled-components"
import {CreateWrap,CreateBlock, CreateHeader,CreateButtonLogin} from './AnswerStyle'
import { useState } from "react"
// 웹 에디터
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';






const EditorBlock =styled.div`
    height: 500px;
  min-height: 400px;
  margin-bottom: 30px;
  .wrapper-class{
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editor {
    height: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
`

const EditorInput =styled.textarea`
width: 100%;
height: 300px;
display: flex;
border: none;
resize: none;
outline: none;
margin-bottom: 10px;
padding: 15px 10px;
overflow: auto;
${'' /* border-radius: 10px; */}
font-size: 1em;
font-family: 'TheJamsil', sans-serif;
font-weight: var(--fonts-weight-regular);
background: var(--colors-answerInput-content);
color: var(--colors-text-default);
white-space: pre-line;
border: 1px solid var(--colors-answerInput-border);


&::placeholder{
    color: var(--colors-text-placeholder-dark);
    font-weight: var(--fonts-weight-regular);
}
&:focus, &:active{
    border: 1px solid var(--colors-yellow);
}
`

const ErrorMessage = styled.span`
    color: var(--colors-error);
`


const AnswerLogin = ({addAnswerHandler}) => {
    const [newAnswerContent, setNewAnswerContent] = useState(EditorState.createEmpty());

    const [invalidAnswer, setInvalidAnswer] = useState(false);

    const onAnswerTextChange = (editorState) => {

        setNewAnswerContent(editorState)
      };

    const onClickSubmit = ()=> {
        // const data = new Date();

        //   console.log("answer answer!", newAnswerContent)
      if (!newAnswerContent){ setInvalidAnswer(true); return;}


        addAnswerHandler(newAnswerContent);
        setNewAnswerContent('');
        setInvalidAnswer(false);

    }


    return (
        <>
        <CreateWrap>
            <CreateBlock>
                <CreateHeader>답변작성</CreateHeader>
                {invalidAnswer ? <ErrorMessage>내용을 입력해주세요.</ErrorMessage> : null}
                <EditorBlock>
                <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }} 
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        // 초기값 설정
        editorState={newAnswerContent}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onAnswerTextChange}
      />
                    {/* <EditorInput type='text' onChange={onAnswerTextChange} value={newAnswerContent} /> */}
                <CreateButtonLogin onClick={onClickSubmit}>작성하기</CreateButtonLogin>
                </EditorBlock>
            </CreateBlock>
        </CreateWrap>
        </>

    )
}

export default AnswerLogin