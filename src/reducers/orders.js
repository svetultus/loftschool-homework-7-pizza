import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

export default (state = [], action) => {
  const newState = state.slice();
  let currentPosition, newPosition;

  switch (action.type) {
    case 'CREATE_NEW_ORDER':
      newState.push(
        Object.assign({}, action.payload, {
          ingredients: [],
          position: 'clients'
        })
      );
      return newState;
    case 'MOVE_ORDER_NEXT':
      let index = action.payload - 1;

      currentPosition = newState[index].position;
      newPosition = position[currentPosition].next;
      if (newPosition === 'finish') {
        if (newState[index].ingredients.length)
          newState[index].position = newPosition;
      } else if (newPosition !== null) newState[index].position = newPosition;

      return newState;
    case 'MOVE_ORDER_BACK':
      currentPosition = newState[action.payload - 1].position;
      newPosition = position[currentPosition].prev;
      if (newPosition)
        newState[action.payload - 1].position = position[currentPosition].prev;

      return newState;
    case 'ADD_INGREDIENT':
      const { from, ingredient } = action.payload;

      newState.forEach(order => {
        if (order.position === from) order.ingredients.push(ingredient);
      });
      return newState;
    default:
      return state;
  }
};

const position = {
  clients: { next: 'conveyor_1', prev: null },
  conveyor_1: { next: 'conveyor_2', prev: null },
  conveyor_2: { next: 'conveyor_3', prev: 'conveyor_1' },
  conveyor_3: { next: 'conveyor_4', prev: 'conveyor_2' },
  conveyor_4: { next: 'finish', prev: 'conveyor_3' }
};

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
