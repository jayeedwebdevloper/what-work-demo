"use client"

import LineChart from "@/components/Shared/LineChart/LineChart"
import Menus from "./Menus/Menus"
import ChartHeader from "@/components/Shared/LineChart/ChartHeader";
import { IoIosNotifications } from "react-icons/io";
import CircleChart from "@/components/Shared/CircleChart/CircleChart";
import { useState } from "react";

export default function Dashboard() {

    // demo data of the day's statics
    const staticsDataDemo = [
        {
            id: 1,
            title: "total leads today",
            amount: 1259
        },
        {
            id: 2,
            title: "open leads",
            amount: 23
        },
        {
            id: 3,
            title: "awarded leads",
            amount: 123
        },
        {
            id: 4,
            title: "total users",
            amount: 123
        }
    ]

    // these chart data will be connect with backend and dynamic. here it is demo for example
    const clientData = [25, 5, 90, 20, 10, 80, 35, 60, 95, 10, 30, 85];
    const professionalData = [20, 40, 35, 45, 55, 50, 60, 10, 76, 20, 70, 30];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // the circular data example
    const leadsStatus = {
        thisMonth: {
            title: "this month",
            openLead: 50,
            awarded: 30,
            rejected: 60
        },
        thisYear: {
            title: "this year",
            openLead: 300,
            awarded: 200,
            rejected: 100
        },
    }

    const [timeFrame, setTimeFrame] = useState<string>("this month");
    const openLeadData = timeFrame == "this month" ? leadsStatus.thisMonth.openLead : timeFrame == "this year" && leadsStatus.thisYear.openLead;
    const rejectedLeadData = timeFrame == "this month" ? leadsStatus.thisMonth.rejected : timeFrame == "this year" && leadsStatus.thisYear.rejected;
    const awardedLeadData = timeFrame == "this month" ? leadsStatus.thisMonth.awarded : timeFrame == "this year" && leadsStatus.thisYear.awarded

    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-5 overflow-y-scroll relative hiddenScroll">

                {/* statics details */}
                <div className="flex flex-wrap gap-5 pb-5">
                    {
                        staticsDataDemo?.map((data, i) => (
                            <div key={i} className="w-full md:w-[180px] lg:w-[18%] h-[130px] bg-[#07242B] px-4 pb-4 pt-10 rounded-md">
                                <h3 className="text-[25px] font-bold text-white">{data?.amount}</h3>
                                <p className="text-[15px] text-[#FFBE00] capitalize">{data?.title}</p>
                            </div>
                        ))
                    }
                    <div className="w-full md:w-[180px] lg:w-[18%] h-[130px] relative bg-[#07242B] rounded-md overflow-hidden">
                        <div className="z-[2] absolute px-4 pt-3">
                            <h3 className="text-white text-start pb-[10px] font-bold text-[15px]">Total Upgrades</h3>
                            <h3 className="text-[25px] font-bold text-white">123</h3>
                            <p className="text-[15px] text-[#FFBE00] capitalize">Users</p>
                        </div>
                        <div className="w-[200px] absolute pt-14 lg:pt-16 ps-12 -right-1/2 lg:-right-[120px] z-[1] -top-[25%] h-[200px] bg-[#FFBE00] rounded-full">
                            <IoIosNotifications className="size-[20px] text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-between flex-col lg:flex-row">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white shadow-lg border border-black/10 w-full p-4 rounded-lg">
                            <ChartHeader />
                            <LineChart
                                clientData={clientData}
                                professionalData={professionalData}
                                labels={labels}
                            />
                        </div>

                        {/* this notification will be dynamically from backend later */}
                        <div className="pt-4">
                            <div className="bg-white shadow-lg border border-black/10 w-full px-4 pt-4 pb-7 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[15px] text-black/70 font-semibold tracking-wide">Support Tickets</h3>
                                        <p className="text-[15px] text-black/70 py-3">You have 10 pending support tickets today</p>
                                    </div>

                                    <button className="text-[15px] px-5 py-2 bg-[#FE321F] rounded-md text-white font-semibold">View Support</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="w-full">
                            {/* this chart also will be dynamic */}
                            <CircleChart
                                openLeads={openLeadData}
                                awardedLeads={awardedLeadData}
                                rejectedLeads={rejectedLeadData}
                                title="Leads Status"
                                timeframe={timeFrame}
                                setTimeFrame={setTimeFrame}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
