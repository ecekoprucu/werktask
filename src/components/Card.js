import React, {useState} from "react";
import {Draggable} from "react-beautiful-dnd";
import { ReactComponent as PenIcon } from '../assets/Vectorpen.svg';
import '../styles/card.css';
import Button from "./Button";
const Card = ({text, cardId, index, listId}) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <Draggable draggableId={cardId.toString()} index={index}>
                {(provided) => {
                    return (
                        <div {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             ref={provided.innerRef} style={{...provided.draggableProps.style,...styles.container}}>
                              <div style={{display: 'flex', alignItems:'center'}}>
                                  <div style={styles.handle} className={listId === 0 ? 'handle-white' : listId === 1 ? 'handle-orange' : 'handle-green'}/>
                                  <p style={styles.text}>{text}</p>
                              </div>
                            <PenIcon onClick={() => setShow(!show)} style={{cursor: 'pointer'}}/>
                        </div>
                    )
                }}
            </Draggable>
            {show ? <Button action="edit" cardId={cardId} text={text} listType={listId} openForm={true}/> : null}
        </div>

    )
}

const styles = {
    container: {
        backgroundColor: 'inherit',
        borderRadius: 3,
        margin: 'auto auto 5px auto',
        padding: 5,
        borderBottom: 1,
        borderColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    handle: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        color: '#fff',
        fontSize: 12
    }
}

export default Card;
