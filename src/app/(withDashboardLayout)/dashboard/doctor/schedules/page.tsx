"use client";

import { useGetAllDoctorScheduleQuery } from "@/redux/api/doctorScheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";

const DoctorSchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);

  const query: Record<string, any> = {};

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading } = useGetAllDoctorScheduleQuery({ ...query });

  const schedules = data?.schedules;
  const meta = data?.meta;

  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta?.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = schedules?.map((schedule: any) => {
      return {
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDateTime),
        endDate: dateFormatter(schedule?.schedule?.endDateTime),
        startTime: dayjs(schedule?.schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete">
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)} endIcon={<AddIcon />}>
        Create Doctor Schedule
      </Button>
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={allSchedule ?? []}
            columns={columns}
            hideFooterPagination
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default DoctorSchedulePage;
