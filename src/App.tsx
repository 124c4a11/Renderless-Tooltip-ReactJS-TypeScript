import { Tooltip } from './components';

function App() {
  return (
    <div className="container">
      <Tooltip text="delete">
        {(props) => (
          <button
            onMouseEnter={(e) => {
              console.log('enter mouse');

              props.onMouseEnter(e);
            }}
            onMouseLeave={props.onMouseLeave}
          >
            X
          </button>
        )}
      </Tooltip>
    </div>
  );
}

export default App;
