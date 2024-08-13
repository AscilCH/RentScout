import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField'; // Correct import path

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

function ProLabel({ children }) {
  return (
    <Stack direction="row" spacing={0.5} component="span">
      <Tooltip title="Included in Pro package">
        <a href="/x/introduction/licensing/#pro-plan">
          <span className="plan-pro" />
        </a>
      </Tooltip>
      <span>{children}</span>
    </Stack>
  );
}

export default function Calendar() {
  const [selectedDateRange, setSelectedDateRange] = React.useState([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);
  console.log(selectedDateRange)
  const handleDateRangeChange = (newDateRange) => {
    setSelectedDateRange(newDateRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {/* Your text here */}
        <p>les jrs quand sera la maison indisponible</p>

        <DemoContainer
          components={[
            'DateField',
            'TimeField',
            'DateTimeField',
            'MultiInputDateRangeField',
            'MultiInputTimeRangeField',
            'MultiInputDateTimeRangeField',
          ]}
        >
          <DemoItem label={<ProLabel>Date Range</ProLabel>} component="MultiInputDateRangeField">
            <MultiInputDateRangeField
              value={selectedDateRange}
              onChange={handleDateRangeChange}
            />
          </DemoItem>
        </DemoContainer>
      </div>
    </LocalizationProvider>
  );
}
