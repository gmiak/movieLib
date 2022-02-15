/** Humble module - Test */
import {app} from "./start";

const PORT : number = 8080; // Isolate the only line that i couldn't create unit tests for.

app.listen(PORT);