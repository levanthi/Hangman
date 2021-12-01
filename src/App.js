
import './App.css';
import Display from './Display'

function App() {
  return (
    <div className="App">
      <div className='hangMan'>
        <h1 className='heading'>Hangman</h1>
        <p className='description'>Find the hidden word - Enter a letter</p>
        <Display />
      </div>
    </div>
  );
}

export default App;
