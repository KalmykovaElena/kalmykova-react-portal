import './App.scss';
import classNames from 'classnames';
import { useTheme } from 'providers/ThemeProvider/useTheme';
import { AppRouter } from 'providers/router/AppRouter';
import { Header } from 'components/widgets/Header/Header';


function App() {
  const { theme } = useTheme();
  return (
    <div className={classNames('App', [theme])}>
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
