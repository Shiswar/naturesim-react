import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { AllWorks } from "./pages/works";
import { ThemeProvider } from "./theme/ThemeContext";
import { Wordle } from "./pages";
import "./App.css";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (<>
    {/* Sidebar */}
    <NavBar />


    {/* Main content area */}
    <div className="flex-grow-1">
      {/* <Header /> */}
      <main className="content-area">
        {children}
      </main>
    </div>
  </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-bg app-container min-vh-100">
        {/* <Container fluid className="flex-grow-1 "> */}
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="works" element={<AllWorks />} />
              <Route path="wordle" element={<Wordle />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </MainLayout>
        {/* </Container> */}
      </div>
    </ThemeProvider>
  );
}

const NavBar: React.FC = () => {
  return (
    <div className="sidebar">
      <nav className="flex min">
        {/* <ul> */}
          {/* <NavLink to="/home" label="Home" />
          <NavLink to="/about" label="About" /> */}
          <NavLink to="/works" label="P5 Stuff" />
          {/* <NavLink to="/about" label="About" /> */}
          <NavLink to="/wordle" label="Wordle" />

          {/* <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li> */}
        {/* </ul> */}
      </nav>
    </div>
  )
}

const NavLink: React.FC<{ to: string, label: string }> = ({ to, label }) => {
  return (
    <Link to={to}>
      <li className="p-3 m-2 bg-orange hover:bg-orng">{label}</li>
    </Link>
  )
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/wordle">Wordle</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}