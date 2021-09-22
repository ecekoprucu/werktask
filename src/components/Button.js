import React, {useState} from "react";
import {connect} from "react-redux";
import {addCard} from '../actions';
import '../styles/button.css';

const Button = (props) => {
    const [state, setState] = useState({
        formOpen: false,
        text: '',
        list: props.listId ? props.listId : 0
    })
    const showButton = () => (
        <button style={props.type === 'inlineButton' ? styles.button : styles.secondButton} onClick={openForm}> {props.type === 'inlineButton' ? '+ Add' : 'New Task'}</button>
    )

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

    const showForm = ({type}) => {
        const placeholder = type==='edit' ? state.text : 'Add task';
        return (
            <div style={styles.outerContainer}>
                {
                    props.listList ? (
                       <div style={styles.container}>
                           <select name="lists" style={styles.listTitle} className={state.list === 0 ? 'todo' : state.list === 1 ? 'in-progress' : 'done'} onChange={(e) => setState({...state, list: e.target.options.selectedIndex})} id="lists">
                               {props.listList.map((list, index) => <option key={index} value={list.title}>{list.title}</option>)}
                           </select>
                       </div>
                    ) : null
                }
                <input type="text" value={state.text} style={styles.input} onChange={handleChange} placeholder={placeholder}/>
                <button style={{...styles.secondButton, alignSelf: 'flex-end'}} onClick={handleAddCard}>Save</button>
                <button style={{height: 25, position: "absolute", right: 25, borderRadius: '100%'}} onClick={closeForm}>X</button>
            </div>
        )
    }

    return (
        <div>
            {state.formOpen ? showForm({type:'add'}) : showButton()}
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
        cursor: 'pointer'
    },
    secondButton: {
        background: 'linear-gradient(97.24deg, #234CA7 -24.31%, #EA596E 131.07%)',
        border: 0,
        color: '#fff',
        padding: 10,
        borderRadius: 8,
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
        height: '95vh',
        marginBottom: 10,
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        height: 25,
        background: 'inherit',
        borderRight: 0,
        borderBottom: '1px solid gray',
        color: '#fff'
    }
}

export default connect()(Button);
