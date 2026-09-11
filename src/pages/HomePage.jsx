import Hero from "../sections/Hero";
import CutDivider from "../components/CutDivider";
import Origin from "../sections/Origin";
import ExploreGrid from "../components/ExploreGrid";

export default function HomePage({ introDone }) {
  return (
    <>
      <Hero introDone={introDone} />
      <CutDivider />
      <Origin />
      <ExploreGrid />
    </>
  );
}
