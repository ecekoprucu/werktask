import React from "react";
import {Draggable} from "react-beautiful-dnd";
import '../styles/card.css';
const Card = ({text, cardId, index, listId}) => {
    return (
        <Draggable draggableId={cardId.toString()} index={index}>
            {(provided) => {
                return (
                    <div {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef} style={{...provided.draggableProps.style,...styles.container}}>
                        <div style={styles.handle} className={listId === 0 ? 'handle-white' : listId === 1 ? 'handle-orange' : 'handle-green'}/>
                        <p style={styles.text}>{text}</p>
                    </div>
                )
            }}
        </Draggable>
    )
}

const styles = {
    container: {
        backgroundColor: 'inherit',
        borderRadius: 3,
        margin: 'auto auto 5px auto',
        padding: 3,
        borderBottom: 1,
        borderColor: '#fff',
        display: 'flex',
        alignItems: 'center',
    },
    handle: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        color: '#fff'
    }
}

export default Card;
