"use client";

import { Box, Button } from "@mui/material";
import ScheduleModal from "./components/SchedulesModal";
import { useState } from "react";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default SchedulesPage;
