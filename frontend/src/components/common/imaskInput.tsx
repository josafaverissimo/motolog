import type { Ref } from 'react'
import { IMaskMixin } from 'react-imask';
import { Input } from "@/components/ui/input";

export const IMaskInput = IMaskMixin(({ inputRef, ...props }) => (
    <Input
      {...props}
      ref={inputRef as Ref<HTMLInputElement>}
    />
  ));
