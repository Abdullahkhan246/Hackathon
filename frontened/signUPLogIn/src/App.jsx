import AppWithInit from './AppWithInit';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
export default function App() {


  return (
     <Provider store={store}>
      <AppWithInit />
     </Provider>
  )
}


