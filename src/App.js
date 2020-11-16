import './App.css';
import MinefieldPage from './views/minefield/MinefieldPage'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <div className="row">
        <div className="offset-md-2 col-md-8">
          <MinefieldPage></MinefieldPage>
        </div>
      </div>
    </div>
  );
}

export default App;
