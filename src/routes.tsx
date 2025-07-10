import Layout from "./pages/_layout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import News from "./pages/news";
import Test from "./pages/test";
import Diary from "./pages/diary";
import Vote from "./pages/vote";
import Community from "./pages/community";
import StartTest from "./pages/test/StartTest";
import Result from "./pages/test/Result";
import VoteResults from "./pages/vote/VoteResults";
import StampHistory from "./pages/mypage/stamp/stampHistory";
import MyWritings from "./pages/mypage/myWritings";
import MyNews from "./pages/mypage/myNews";
import Debate from "./pages/community/debate/Debate";
import Free from "./pages/community/free/Free";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "mywritings",
        element: <MyWritings />,
      },
      {
        path: "mynews",
        element: <MyNews />,
      },
      {
        path: "stampHistory",
        element: <StampHistory />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "startTest",
        element: <StartTest />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "testResult",
        element: <Result />,
      },
      {
        path: "diary",
        element: <Diary />,
      },
      {
        path: "vote",
        element: <Vote />,
      },
      {
        path: "voteResults",
        element: <VoteResults />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "debate",
        element: <Debate />,
      },
      {
        path: "free",
        element: <Free />,
      },
    ],
  },
];
