import CONSTANTS from "./index";

export const addCard = (listId, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listId, text}
    }
}

export const sort = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId) => {
    return {
        type: CONSTANTS.DRAGGING,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }
    }
}

export const edit = (cardId, text) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {cardId, text}
    }
}
