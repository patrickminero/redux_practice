import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavBar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap'
import { useEffect } from 'react';
import { getItems } from './actions/itemActions';

function App() {

  useEffect(()=>{
    store.dispatch(getItems());
  }, [])
  
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar/>
        <Container>
          <ItemModal/>
          <ShoppingList/>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
