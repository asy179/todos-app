import Header from '../components/Header';
import TodosLogic from '../components/TodosLogic';

const Home = () => {
  return (
      <div className="todos">
        <Header>
            <h1>todos.</h1>
        </Header>
        <TodosLogic />
      </div>
  );
};
export default Home;