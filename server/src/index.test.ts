// Integration test
/** This test would test the all backend without the 
 ** the Humble-part (start.ts)
 */

 import { app } from "./start";
 import SuperTest from "supertest";

 test("If we PUT a task T then GET the list of tasks, we should get the lits [T]", () => {
    const request : SuperTest.SuperTest<SuperTest.Test> = 
        SuperTest(app);

    request.put("/movie")
        .send({titel:"Superman", year:"1999", picture:"link", description:"Louise & Clark", genre:"Adventure"})
        .end((err, res) => {
            if (err) throw err;
        });

    return request.get("/movie")
        .then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].description).toEqual("Louise & Clark");
        });
});