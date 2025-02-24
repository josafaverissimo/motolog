"use client";

import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import type { ClassNames } from "react-day-picker";

interface DatePickerProps {
	onSelectAction: (date: Date | undefined) => void;
	fromMonth: Date;
	toMonth: Date;
	defaultMonth: Date;
	month?: Date;
}

const calendarExtraClasses: ClassNames = {
	caption_dropdowns: cn("flex justify-between w-full"),
	vhidden: cn("hidden"),
	dropdown_icon: cn("hidden"),
	dropdown: cn("bg-transparent"),
	caption_label: cn("hidden"),
};

export function DatePicker({
	onSelectAction,
	fromMonth,
	toMonth,
	defaultMonth,
	month,
}: DatePickerProps) {
	const [date, setDate] = React.useState<Date>();

	function handleDate(newDate: Date | undefined) {
		setDate(newDate);
		onSelectAction(newDate);
	}

	useEffect(() => {
		setDate(month)
	}, [month]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal bg-opacity-100",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						date.toLocaleDateString("pt-BR")
					) : (
						<span>Selecione uma data</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					locale={ptBR}
					mode="single"
					captionLayout="dropdown"
					defaultMonth={defaultMonth}
					fromMonth={fromMonth}
					toMonth={toMonth}
					selected={date}
					onSelect={handleDate}
					initialFocus
					classNames={calendarExtraClasses}
				/>
			</PopoverContent>
		</Popover>
	);
}
