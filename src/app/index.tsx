import { RouterProvider } from 'react-router-dom';
import { appRouter } from './model/appRouter';
import { store } from './model/appStore';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter()} />
    </Provider>
  );
};

export default App;
