//import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import image from "./img/backgroundimage.jpg"; 
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  const myStyle={
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (
    <div>
      
      <div style={myStyle} >
      </div>
      <AppRouter/>
    </div>
  );
};

export default App;
