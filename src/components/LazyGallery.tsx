import { lazy, Suspense, type ComponentProps } from "react";

// The gallery (and its 210 image URLs) is a separate chunk, so the first paint doesn't pay for it.
const Gallery = lazy(() => import("./Gallery"));

export default function LazyGallery(props: ComponentProps<typeof Gallery>) {
  return <Suspense fallback={null}><Gallery {...props} /></Suspense>;
}
