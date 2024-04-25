"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeSelectorProps {
	onUpdateDateRange: (startDate: Date, endDate: Date) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
	onUpdateDateRange,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);

		if (start && end) {
			onUpdateDateRange(start, end);
		}
	};

	return (
		<div className="date-range-selector mt-[2rem]">
			<DatePicker
				selectsRange
				startDate={startDate}
				endDate={endDate}
				onChange={handleDateChange}
				inline
			/>
		</div>
	);
};

export default DateRangeSelector;
