import React from "react";
import Card from "./Card";
import Button from "./Button";
import {Droppable} from "react-beautiful-dnd";
import '../styles/list.css';

const List = ({title, cards, listId}) => {
    return (
        <div>
            <h4 style={styles.title} className={listId===0 ? 'border-white' : listId === 1 ? 'border-yellow' : 'border-green'}>{title}</h4>
            <Droppable droppableId={listId.toString()}>
                {(provided) => {
                    return (
                        <div {...provided.droppableProps} className={listId === 0 ? 'lightgray' : 'darkgray'} ref={provided.innerRef} style={styles.container}>
                            {cards.map((card, index) => <Card listId={listId} index={index} key={card.id} cardId={card.id} text={card.text}/>)}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            <Button type='inlineButton' listId={listId} />
        </div>
    )
}

const styles = {
    container: {
        borderRadius: 3,
        width: 300,
    },
    title: {
        color: '#fff',
        padding: '1em',
        width: '50%',
        borderRadius: 5
    }
}

export default List;
