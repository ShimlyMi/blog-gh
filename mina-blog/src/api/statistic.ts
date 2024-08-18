import Request from "@/utils/http/request";

/**  */
export const getStatistic = () => {
  return new Promise((resolve) => {
    Request.get("/api/statistic/", {}).then(
      (res: any) => {
        resolve(res);
      }
    );
  });
}
