import { Chatroom } from "@/components/chatroom";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="h-full">
      <Chatroom id={id} />
    </div>
  );
}
