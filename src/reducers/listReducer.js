import CONSTANTS from "../actions";

const initialState = [
    {
        title: 'To do',
        id: 0,
        cards: [
            {
                id: 0,
                text: 'Get things done'
            },
        ]
    },
    {
        title: 'In Progress',
        id: 1,
        cards: [

        ]
    },
    {
        title: 'Done',
        id: 2,
        cards: [

        ]
    }
]

let cardID = 1;

const ListReducer = (state=initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: cardID
            }
            cardID++;

            return state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
        case CONSTANTS.DRAGGING:
            const {droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd} = action.payload;
            const newState = [...state];

            //In the same list
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => parseInt(droppableIdStart) === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            } else {
                const listStart = state.find(list => parseInt(droppableIdStart) === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);

                const listEnd = state.find(list => parseInt(droppableIdEnd) === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        case CONSTANTS.EDIT_CARD:
            return state.map(list => {
                return {
                    ...list, cards: list.cards.map(card => {
                        if (card.id === action.payload.cardId) {
                            return {
                                ...card,
                                text: action.payload.text
                            }
                        } else {
                            return card;
                        }
                    })
                }
            })
        default:
            return state;
    }
}

export default ListReducer;
