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

import type { ClassNames } from "react-day-picker";

interface DatePickerProps {
	onSelectAction: (date: Date | undefined) => void;
}

const calendarExtraClasses: ClassNames = {
	caption_dropdowns: cn("flex justify-between w-full"),
	vhidden: cn("hidden"),
	dropdown_icon: cn("hidden"),
	dropdown: cn("bg-transparent"),
	caption_label: cn("hidden"),
};

export function DatePicker({ onSelectAction }: DatePickerProps) {
	const [date, setDate] = React.useState<Date>();

	const date18YearsOld = new Date();
	date18YearsOld.setFullYear(date18YearsOld.getFullYear() - 18);

	const date100YearsOld = new Date();
	date100YearsOld.setFullYear(date100YearsOld.getFullYear() - 100);

	function handleDate(newDate: Date | undefined) {
		setDate(newDate);
		onSelectAction(newDate);
	}

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
					defaultMonth={date18YearsOld}
					fromMonth={date100YearsOld} // 🔥 Substitui startMonth
					toMonth={date18YearsOld}
					selected={date}
					onSelect={handleDate}
					initialFocus
					classNames={calendarExtraClasses}
				/>
			</PopoverContent>
		</Popover>
	);
}
