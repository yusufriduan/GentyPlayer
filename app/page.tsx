import "./globals.css";
import MainComponent from "../components/MainComponent";
import AuthHandler from "../components/AuthHandler";
import Header from "../components/header";
import Footer from "../components/footer";


export default function Page() {
  return (
    <div className="App">
      <AuthHandler />
      <header className="App-header">
        <Header />
      </header>
      <main>
        <MainComponent />
      </main>
      <Footer />
    </div>
  );
};