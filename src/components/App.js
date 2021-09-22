import './App.css';
import List from "./List";
import {connect} from "react-redux";
import Button from "./Button";
import {DragDropContext} from "react-beautiful-dnd";
import {sort} from "../actions";

function App (props) {
    const {list} = props;

    function onDragEnd (result) {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return;
        }

        props.dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId))
    }

    return (
       <DragDropContext onDragEnd={onDragEnd}>
           <div className="App">
               {list.map(list => <List key={list.id} listId={list.id} title={list.title} cards={list.cards}/> )}
               <Button type="outerButton" listList={list} />
           </div>
       </DragDropContext>
    );
}

const mapStateToProps = state => {
    return (
        {
            list: state.lists
        }
    )
}

export default connect(mapStateToProps)(App);
