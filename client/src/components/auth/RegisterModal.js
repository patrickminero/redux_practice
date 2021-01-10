import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { useState, useEffect, useCallback } from 'react';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { useDispatch, useSelector } from 'react-redux';

const RegisterModal = () =>{
  
  const error = useSelector(state => state.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const user = {username, email, password}


  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    dispatch(clearErrors());
    setCollapsed(!collapsed);
  }, [dispatch, collapsed])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(user));
  }

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.message.msg);
    } else {
      setMsg(null);
    }
    if (collapsed){
      if (isAuthenticated){
        toggleModal();
      }
    }
  }, [error , collapsed, toggleModal, isAuthenticated])
  
  return(
    <div>
      <NavLink onClick={toggleModal} className="text-info">Register</NavLink>
      <Modal isOpen={collapsed} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} autoFocus />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} autoFocus />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} autoFocus />
            </FormGroup>
            <Button type="submit" color="dark" block>Register</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}



export default RegisterModal;