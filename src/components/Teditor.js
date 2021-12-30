import React, {useEffect, useState } from 'react';
import { EditorState ,convertFromRaw,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createWithContent, set } from 'draft-js/lib/EditorState';
import axios from '../services/axios.js';
import {axios as aos} from 'axios'
import { useLocation } from 'react-router-dom';
import { ContentState } from 'draft-js';
const Teditor = () => {
  const {state} = useLocation();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const fromDb = (jsData)=>{
    const raw = JSON.parse(jsData)
    const cState = convertFromRaw(raw)
    const eState = createWithContent(cState)
    return eState
  }
  // const [editorState, setEditorState] = useState(fromDb(state.data));
  // console.log('state = ',state.data)
  
  const fun = async ()=>{
    const res = await axios.getTemplateById(state.templateId)
    const dt = res.data.data
    setEditorState(fromDb(dt))
  }
  useEffect(() => {
    fun()    
    handleEditorChange(editorState)
  }, [])

  const handleEditorChange = (state) => {
    setEditorState(state);
  }
  const toDb = (state)=>{
    const raw = convertToRaw(state.getCurrentContent())
    const jsData = JSON.stringify(raw)
    return jsData
  }
  const saveTemplate = async(e)=>{
    e.preventDefault()
    const dbData = toDb(editorState)
    const obj = {
      data:dbData
    }
    await axios.UpdateTemplate(state.templateId,obj)
    console.log('success!');
  }
  
  const loadTemplate = async (e)=>{
    e.preventDefault()
    const templateData = await axios.getTemplateById(state.templateId)
    console.log('templateData = ',templateData)
    const data = templateData.data.data
    const estate = fromDb(data)    
    setEditorState(estate)
  }
  //console.log('hello text editor',props.location.state.id)
  return (
    <div className="App">
      <div className = 'wrapper'>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName='hide-toolbar'
        />
      </div>
      <div>
        <button onClick ={loadTemplate}>load</button>
        <button onClick = {saveTemplate}>Save</button>
      </div>
    </div>
  )
}
export default Teditor;
