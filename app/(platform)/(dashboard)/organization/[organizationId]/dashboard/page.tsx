import ChartOne from "@/components/charts/chart-one";
import DataStatsOne from "./_components/data-stats-one";
import ChartTwo from "@/components/charts/chart-two";
import ChartThree from "@/components/charts/chart-three";
import TableOne from "@/components/tables/table-one";
import MapOne1 from "@/components/maps/map-one-1";
import ChatCard from "./_components/chat-card";

const DashboardHome = () => {
  return (
    <>
      <div className="h-full light:bg-gray-3 mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <DataStatsOne />

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          <ChartThree />

          <MapOne1 />

          <div className="col-span-12 xl:col-span-8">
            <TableOne />
          </div>
          <ChatCard />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
