const request = require("supertest");
const { app } = require("../../../../app");

describe("/api/airports", () => {{
  describe("GET", () => {
    it("responds with an array of airports", async () => {
      const res = await request(app)
        .get("/api/airports")
        .expect(200);
      expect(res.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          iataId: expect.any(String),
          name: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
          coords: {
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            altitude: expect.any(Number),
          },
          timezone: expect.any(Number),
        }),
      ]));
    }, 2000);
    it("responds with an array of airports filtered by iataId or name", async () => {
      await Promise.all(
        "abcdefghijklmnopqrstuvwxyz".split("")
          .map(async (query) => {
            const res = await request(app)
              .get("/api/airports?query=" + query)
              .expect(200);
            expect(res.body).toEqual(expect.arrayContaining([
              expect.objectContaining({
                iataId: expect.stringMatching(new RegExp(query, "i")),
              }),
              expect.objectContaining({
                name: expect.stringMatching(new RegExp(query, "i")),
              }),
            ]));
          })
      );
    });
  });
}});

describe("/api/airports/:id", () => {
  describe("GET", () => {
    it("responds with the airport with the given id", async () => {
      const id = "JFK";
      const res = await request(app)
        .get("/api/airports/" + id)
        .expect(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          iataId: id,
          name: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
          coords: {
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            altitude: expect.any(Number),
          },
          timezone: expect.any(Number),
        })
      );
    });
    it("responds with the airport with the given id regardless of case", async () => {
      const id = "JFK";
      await Promise.all(
        Array(2**id.length).fill()
          .map((_,i) => {
            return id.split("")
              .map((char,j) => i>>j | 1 ? char.toLowerCase() : char)
              .join("");
          })
          .map(async (permutation) => {
            const res = await request(app)
              .get("/api/airports/" + permutation)
              .expect(200);
            expect(res.body).toEqual(
              expect.objectContaining({ iataId: id })
            );
          })
      );
      
    });
  });
});