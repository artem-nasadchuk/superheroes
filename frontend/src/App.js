import { Routes, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { SuperheroCard } from './components/SuperheroCard';
import { SuperheroForm } from './components/SuperheroForm';
import SuperheroList from './components/SuperheroList/SuperheroList';
import SuperheroDetail from './components/SuperheroDetail/SuperheroDetail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/superheroes" element={<SuperheroList />} />
        <Route path="/superheroes/new" element={<SuperheroForm />} />
        <Route path="/superheroes/:id" element={<SuperheroDetail />} />
      </Routes>
    </div>
  );
}

export default App;
