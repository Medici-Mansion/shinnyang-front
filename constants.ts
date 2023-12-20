import * as z from "zod";
export const ServiceProviders = z.enum(["google"], {
  invalid_type_error: "지원하지 않는 서비스입니다.",
});
