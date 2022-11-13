import { Tooltip } from './components';

function App() {
  return (
    <div className="container">
      <Tooltip text="delete">
        {(propsGetter) => (
          <button
            {...propsGetter({
              onMouseEnter: (e) => console.log('mouse enter'),
            })}
          >
            X
          </button>
        )}
      </Tooltip>
    </div>
  );
}

export default App;
