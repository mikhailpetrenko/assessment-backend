const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getGoals, addGoal, updateGoal, removeGoal } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune)
app.get("/api/goaldb", getGoals)
app.post("/api/goaldb", addGoal)
app.put("/api/goaldb/:id", updateGoal)
app.delete("/api/goaldb/:id", removeGoal)

app.listen(4000, () => console.log("Server running on 4000"));
