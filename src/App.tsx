import NavBar from "./components/NavBar";
import MainBody from "./components/MainBody";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex w-full h-screen flex-col ">
      <NavBar />
      <MainBody />
      <Footer />
    </div>
  );
}

export default App;
