import React, {useEffect, useState } from 'react';
import { EditorState ,convertFromRaw,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createWithContent } from 'draft-js/lib/EditorState';
import axios from '../services/axios.js';
import {axios as aos} from 'axios'
const Teditor = () => {
  
 // const id=props.location.state.id;
  const [title,setTitle]=useState('')
 

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  useEffect(() => {
    setEditorState(editorState)
  }, [])
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    toDb(state)
  }
  const toDb = (state)=>{
    const raw = convertToRaw(state.getCurrentContent())
    const jsData = JSON.stringify(raw)
    localStorage.setItem('val',jsData)
    return jsData
  }
  const fromJson = (jsData)=>{
    // const jsData = localStorage.getItem('val')
    const raw = JSON.parse(jsData)
    const cState = convertFromRaw(raw)
    const eState = createWithContent(cState)
    return eState
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  const addTemplate = async(e)=>{
    e.preventDefault()
    const jsData = toDb(editorState)
    console.log('our id: ')
    console.log('jssssData = ',jsData)
    const template = {
      userId:localStorage.getItem('pre'),
      data:jsData,
      name:title
    }
    const data = await axios.addTemplate(template)
    console.log('success!');
  }
  //console.log('hello text editor',props.location.state.id)
  const loadTemplate = async (e)=>{
    e.preventDefault()
    const jsData = await axios.getTemplates()
    const data = jsData.data[1]
    console.log('data = ',data)
    const estate = fromJson(data.data)
    console.log('estate = ',estate)
    setEditorState(estate)

  }
  //console.log('hello text editor',props.location.state.id)
  return (
    <div className="App">
      <span>title</span>
      <input
        type='text'
        placeholder='Enter Username'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      <div className = 'wrapper'>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName='hide-toolbar'
        />
      </div>
      {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}> sdfa</div> */}
      <div>
        <button onClick ={addTemplate}>Save</button>
      </div>
    </div>
  )
}
export default Teditor;
