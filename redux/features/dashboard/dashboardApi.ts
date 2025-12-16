import { baseApi } from "@/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET: Dashboard statistics
        getDashboardStatistics: builder.query({
            query: () => "/dashboard/statistics",
        }),
    }),
});

export const { useGetDashboardStatisticsQuery } = dashboardApi;
