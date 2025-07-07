import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './pages/_layout';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const Main = lazy(() => import('./pages/main'));
const Mypage = lazy(() => import('./pages/mypage'));
const News = lazy(() => import('./pages/news'));
const Test = lazy(() => import('./pages/test'));
const Diary = lazy(() => import('./pages/diary'));
const Vote = lazy(() => import('./pages/vote'));
const Community = lazy(() => import('./pages/community'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="news" element={<News />} />
          <Route path="test" element={<Test />} />
          <Route path="diary" element={<Diary />} />
          <Route path="vote" element={<Vote />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;