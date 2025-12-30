import { lazy, Suspense } from "react";
import Header from "./components/header"
import Hero from "./components/hero"
import Showcase from "./components/showcase";
import Performance from "./components/performance";

const ProductViewer = lazy(() => import("./components/product-viewer"))

const App = () => {
  return (
    <main>
      <Header/>
      <Hero/>
      <Suspense fallback={<div style={{height:"100vh"}}></div>}>
        <ProductViewer/>
      </Suspense>
      <Showcase/>
      <Performance/>
    </main>
  )
}

export default App