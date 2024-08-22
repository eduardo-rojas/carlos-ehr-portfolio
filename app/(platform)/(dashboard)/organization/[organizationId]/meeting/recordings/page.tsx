import { CallList } from "../_components/call-list";

const RecordingsMeeting = () => {
  return (
    <section className="flex size-full flex-col gap-10 dark:text-white">
      <h1 className="text-3xl font-bold ">Recordings</h1>

      <CallList type="recordings" />
    </section>
  );
};

export default RecordingsMeeting;
