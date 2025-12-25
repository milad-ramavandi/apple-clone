import { lazy, Suspense } from "react";
import Header from "./components/header"
import Hero from "./components/hero"
// import ProductViewer from "./components/product-viewer"
import Showcase from "./components/showcase";

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
    </main>
  )
}

export default App