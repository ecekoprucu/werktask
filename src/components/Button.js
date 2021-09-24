import React, {useState} from "react";
import {connect} from "react-redux";
import {addCard, edit} from '../actions';
import { ReactComponent as PersonIcon } from '../assets/assignee.svg';
import { ReactComponent as CalenderIcon } from '../assets/Vector.svg';
import { ReactComponent as DetailIcon } from '../assets/details.svg';
import '../styles/button.css';

const Button = (props) => {
    const [state, setState] = useState({
        formOpen: props.openForm,
        text: !props.text ? '' : props.text,
        list: props.listId ? props.listId : 0
    })
    const showButton = () => {
        if(!props.formOpen) {
            return <button style={props.type === 'inlineButton' ? styles.button : styles.secondButton} onClick={openForm}> {props.type === 'inlineButton' ? '+ Add' : 'New Task'}</button>
        } else return null;
    }

    function handleChange (e) {
        setState({...state, text: e.target.value})
    }

    function openForm() {
        setState({...state, formOpen: true})
    }

    function closeForm () {
        setState({...state, formOpen: false, text: ''})
    }

    function handleAddCard () {
        const {dispatch} = props;
        const {text} = state;

        if(text!=='') {
            dispatch(addCard(state.list, state.text));
        }
    }

    function handleEditCard () {
        const {dispatch} = props;
        const {text} = state;

        if(text!== '') {
            dispatch(edit(props.cardId, text));
        }
    }

    const showForm = ({type}) => {
        const placeholder = type==='edit' ? state.text : 'Add task';
        return (
            <div style={styles.outerContainer}>
                  <div style={styles.topWrapper}>
                      {
                          props.listList ? (
                              <div style={styles.container}>
                                  <select name="lists" style={styles.listTitle} className={state.list === 0 ? 'todo' : state.list === 1 ? 'in-progress' : 'done'} onChange={(e) => setState({...state, list: e.target.options.selectedIndex})} id="lists">
                                      {props.listList.map((list, index) => <option key={index} value={list.title}>{list.title}</option>)}
                                  </select>
                              </div>
                          ) : <div style={styles.taskType} className={props.listType === 1 ? 'configure-width' : ''}>
                              <div style={styles.handle} className={props.listType === 0 ? 'handle-white' : props.listType === 1 ? 'handle-orange' : 'handle-green'}/>
                              {props.listType === 0 ? 'todo' : props.listType === 1 ? 'in-progress' : 'done'}
                          </div>
                      }
                      <input type="text" value={state.text} style={styles.input} onChange={handleChange} placeholder={placeholder}/>
                      <span style={{color: 'white', fontSize: 23, display: 'flex', alignItems: 'flex-end', height: 25}}>
                          <p style={{margin: 0}}>
                              ...
                          </p>
                      </span>
                      <button style={styles.closeButton} onClick={closeForm}>X</button>
                  </div>
                  <div style={styles.midWrapper}>
                      <div>
                          <p>Assignee</p>
                          <p>Due Date</p>
                          <p>Priority</p>
                          <p>Description</p>
                      </div>
                      <div style={styles.contentDetail}>
                          <p>{<PersonIcon style={{marginRight: '5px'}}/>} Add assignee</p>
                          <p>{<CalenderIcon style={{marginRight: '5px'}}/>} Add due date</p>
                          <p>--</p>
                          <p>{<DetailIcon style={{marginRight: '5px'}}/>} Add more details</p>
                      </div>
                  </div>
                  <button style={{...styles.secondButton, position: 'absolute', right: 25, bottom: 25}} onClick={type === 'edit' ? handleEditCard : handleAddCard}>Save</button>
            </div>
        )
    }

    return (
        <div>
            {state.formOpen ? showForm({type:props.action}) : showButton()}
        </div>
    )
}

const styles = {
    button: {
        width: '100%',
        backgroundColor: 'inherit',
        color: '#fff',
        padding: 10,
        border: 0,
        cursor: 'pointer',
        fontFamily: 'Poppins',
        opacity: 0.5,
        fontSize: 14
    },
    secondButton: {
        background: 'linear-gradient(97.24deg, #234CA7 -24.31%, #EA596E 131.07%)',
        border: 0,
        color: '#fff',
        padding: '10px 15px',
        borderRadius: 4,
        cursor: 'pointer'
},
    container: {
        color: '#fff'
    },
    listTitle: {
        border: '1px solid',
        background: 'inherit',
        padding: 5
    },
    outerContainer: {
        width: '30vw',
        position: 'absolute',
        right: 0,
        top:0,
        background: '#242424',
        height: '98vh',
        marginBottom: 10,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2
    },
    input: {
        height: 25,
        background: 'inherit',
        border: 0,
        color: '#fff',
        outline: 'none',
        fontFamily: 'Poppins',
        width: '100%'
    },
    closeButton: {
        height: 25,
        right: 25,
        background: 'inherit',
        border: 0,
        color: 'white',
        fontSize: '16px'
    },
    topWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        gap: '1em',
        borderBottom: '1px solid gray',
        paddingBottom: '1em'
    },
    taskType: {
        border: '1px solid',
        color: '#fff',
        padding: '0.5em 1em',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        fontSize: 14
    },
    handle: {
        width: 15,
        height: 15,
        marginRight: 8
    },
    midWrapper: {
        padding: '1em',
        color: '#fff',
        display: 'flex',
        gap: '5em',
        borderBottom: '1px solid gray',
        paddingBottom: '1em',
        fontSize: 14,
        lineHeight: '21px'
    },
    contentDetail: {
        opacity: 0.5,
    }
}

export default connect()(Button);
