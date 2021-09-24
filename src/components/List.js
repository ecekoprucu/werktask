import React from "react";
import Card from "./Card";
import Button from "./Button";
import {Droppable} from "react-beautiful-dnd";
import '../styles/list.css';

const List = ({title, cards, listId}) => {
    return cards.length > 0 ? (
        <div>
            <div style={styles.title} className={listId===0 ? 'border-white' : listId === 1 ? 'border-orange' : 'border-green'}>{title}
                <span>
                    {cards.length}
                </span>
            </div>
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
            <Button type='inlineButton' action="add" formOpen={false} listType={listId} listId={listId} />
        </div>
    ) : <div style={{width: 300}}>
            <div style={styles.title} className={listId===0 ? 'border-white' : listId === 1 ? 'border-orange' : 'border-green'}>
                {title}
                <span>
                        {cards.length}
                </span>
            </div>
           <div style={{width: '100%', border: '1px dashed #474646', padding: '1em'}}>
               <Button type='inlineButton' action="add" formOpen={false} listType={listId} listId={listId} />
           </div>
         </div>
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
        borderRadius: 5,
        marginBottom: '1em',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default List;
