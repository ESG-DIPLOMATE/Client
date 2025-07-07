import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import '@/styles/fonts.scss';
import $ from './App.module.scss';


function App() {
  const elem = useRoutes(routes);

  return (
    <div className={$.Wrapper}>
    <div className={$.ContentWrapper}>
        {elem}
    </div>
  </div>
  );
}

export default App;