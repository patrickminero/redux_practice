import {Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getItems } from '../actions/itemActions';
// import { useEffect, useReducer } from 'react';
import store from '../store';




const ShoppingList = () => {  
  const dispatch = useDispatch();
  
  store.dispatch(getItems)
  
  
  const selectItems = state => state.item.items;
  const state = useSelector(selectItems);
  

  

  const handleDelete = (e) =>{
    e.preventDefault()
    const id  = e.target.id;
    dispatch(deleteItem(id))
  }

  return(
    <Container>
      <ListGroup>
        <TransitionGroup className="Shopping-list">
          {state.map((elem) => {
            return(
            <CSSTransition key={elem._id} timeout={500} classNames="fade">
              <ListGroupItem>
              <Button className="remove-btn" color="danger" size="sm" id={elem._id} onClick={handleDelete}>&times;</Button>
                {elem.name}
              </ListGroupItem>
            </CSSTransition>)
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}

export default ShoppingList;