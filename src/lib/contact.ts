export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "phone" | "inquiryType" | "message", string>
  >;
  mode?: "sent" | "preview";
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};
