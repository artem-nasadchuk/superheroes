import { Navbar } from './components/Navbar';
import { SuperheroCard } from './components/SuperheroCard';
import { SuperheroForm } from './components/SuperheroForm';
import SuperheroList from './components/SuperheroList/SuperheroList';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <SuperheroForm /> */}
      <SuperheroList />
    </div>
  );
}

export default App;
