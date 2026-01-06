import { lazy, Suspense } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import Showcase from "./components/showcase";
import Performance from "./components/performance";
import Highlights from "./components/highlights";
import Footer from "./components/footer";

const ProductViewer = lazy(() => import("./components/product-viewer"));
const Features = lazy(() => import("./components/features"));

const App = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <ProductViewer />
      </Suspense>
      <Showcase />
      <Performance />
      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <Features />
      </Suspense>
      <Highlights />
      <Footer />
    </main>
  );
};

export default App;
