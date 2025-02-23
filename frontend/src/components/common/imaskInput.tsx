import { Input } from "@/components/ui/input";
import type { Ref } from "react";
import { IMaskMixin } from "react-imask";

export const IMaskInput = IMaskMixin(({ inputRef, ...props }) => (
	<Input ref={inputRef as Ref<HTMLInputElement>} {...props} />
));
