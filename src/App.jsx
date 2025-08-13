import './App.css';
import Homepage from './Pages/HomePage/Homepage';
import MembersPage from './Pages/Members/MembersPage';
import MembersArea from './Pages/MembersArea/MembersArea';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './Root/Root';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root /> }>
      <Route index element={<Homepage />} /> 
      <Route path='homePage' element={ <Homepage /> } />
      <Route path='membersPage' element={ <MembersPage />} />
      <Route path="/membersArea" element={<MembersArea />} />
    </Route>
  ))


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
