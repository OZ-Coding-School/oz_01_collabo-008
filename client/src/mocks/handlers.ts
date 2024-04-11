import { HttpResponse, http } from "msw";

export const handlers = [
  //회원가입
  http.post("/api/v1/members/register", async ({ request }) => {
    const info = await request.json();

    return HttpResponse.json(info, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];
