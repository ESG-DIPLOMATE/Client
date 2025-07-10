import Layout from "./pages/Layout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import News from "./pages/news";
import Test from "./pages/test";
import Vote from "./pages/vote";
import Community from "./pages/community";
import StartTest from "./pages/test/StartTest";
import Result from "./pages/test/Result";
import VoteResults from "./pages/vote/VoteResults";
import StampHistory from "./pages/mypage/stamp/stampHistory";
import MyWritings from "./pages/mypage/myWritings";
import MyNews from "./pages/mypage/myNews";
import DebatePostPage from "./pages/community/debate/DebatePostPage";
import DebatePostDetail from "./pages/community/debate/DebatePostDetail";
import FreePostPage from "./pages/community/free/FreePostPage";
import FreePostDetail from "./pages/community/free/FreePostDetail";
import DiaryPostPage from "./pages/diary/DiaryPostPage";
import DiaryPostDetail from "./pages/diary/DiaryPostDetail";
import DebateListPage from "./pages/community/debate/DebateListPage";
import DiaryListPage from "./pages/diary/DiaryListPage";
import FreeListPage from "./pages/community/free/FreeListPage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "news", element: <News /> },
      { path: "startTest", element: <StartTest /> },
      { path: "test", element: <Test /> },
      { path: "testResult", element: <Result /> },
      { path: "vote", element: <Vote /> },
      { path: "voteResults", element: <VoteResults /> },

      {
        path: "mypage",
        element: <Layout />,
        children: [
          { index: true, element: <Mypage /> },
          { path: "mywritings", element: <MyWritings /> },
          { path: "mynews", element: <MyNews /> },
          { path: "stampHistory", element: <StampHistory /> },
        ],
      },

      {
        path: "diary",
        element: <Layout />,
        children: [
          { index: true, element: <DiaryListPage /> },
          { path: "new", element: <DiaryPostPage /> },
          { path: ":id", element: <DiaryPostDetail /> },
        ],
      },

      {
        path: "community",
        element: <Community />,
      },

      {
        path: "free",
        element: <Layout />,
        children: [
          { index: true, element: <FreeListPage /> },
          { path: "new", element: <FreePostPage /> },
          { path: ":id", element: <FreePostDetail /> },
        ],
      },

      {
        path: "debate",
        element: <Layout />,
        children: [
          { index: true, element: <DebateListPage /> },
          { path: "new", element: <DebatePostPage /> },
          { path: ":id", element: <DebatePostDetail /> },
        ],
      },
    ],
  },
];
