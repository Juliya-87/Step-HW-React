import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner.jsx";

const withLazyLoad = importFunc => {
  const LazyComponent = lazy(importFunc);

  return () => (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
};

export default withLazyLoad;
