import dynamic from "next/dynamic";
const QuestionComponent = dynamic(
  () => import('@/features/question/screen/question'),
  { ssr: false }
)
export default function Question() {
  return (
    <QuestionComponent />
  );
}
