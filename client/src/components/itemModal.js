import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { addItem } from '../actions/itemActions';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ItemModal = () =>{

  const [collapsed, setCollapsed] = useState(false);
  const [item, setItem] = useState('');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const toggleModal = () => setCollapsed(!collapsed);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(item))
    toggleModal();
  }
  


  return(
    <div>
      { isAuthenticated ? 
      <Button color="dark" style={{margin: '2em 1em'}} onClick={toggleModal}>
        Add item
      </Button> : <h4>Please log in to start</h4>
      }

      <Modal isOpen={collapsed} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add to shopping list</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input type="text" name="name" id="name" placeholder="add to shopping cart" onChange={e => setItem(e.target.value)} autoFocus />
            </FormGroup>
            <Button type="submit" color="dark" block>Add</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}



export default ItemModal;