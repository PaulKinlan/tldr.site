import { render } from 'preact'
import Router from 'preact-router';
import { Home } from './routes/home.js';

import { About } from './routes/about.js';
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';

import "./css/index.css";

const Container = ({ children }) => {
  return (<>
    <Header></Header>
    {children}
    <Footer></Footer>
  </>)
}
const Main = () => (
  <Router>
    <Container path="/"><Home /></Container>
    <Container path="/about"><About /></Container>
  </Router>
);

render(<Main />, document.body);