import dynamic from "next/dynamic";
const SummaryComponent = dynamic(
  () => import('@/features/question/screen/summary'),
  { ssr: false }
)
export default function Summary() {
  return (
    <SummaryComponent />
  );
}
