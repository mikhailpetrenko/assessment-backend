const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const addGoalBtn = document.getElementById("addGoalButton");
const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
        .catch(err => console.log(err));
};

const addGoal = () => {
    const newGoal = goalInput.value;
    axios.post("http://localhost:4000/api/goaldb", { goalName: newGoal })
        .then(res => {
            const data = res.data;
            displayGoals();
        })
        .catch(err => console.log(err));
};

const editGoal = (goalId, goalName) => {
    const li = document.getElementById(`goal-${goalId}`);
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = goalName;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    saveBtn.style.backgroundColor = "#e8e474";
    saveBtn.style.color = "black";
    saveBtn.style.marginRight = "5px";

    saveBtn.addEventListener("click", () => {
        const updatedGoalName = inputField.value;
        axios.put(`http://localhost:4000/api/goaldb/${goalId}`, { goalName: updatedGoalName })
            .then(res => {
                displayGoals();
            })
            .catch(err => console.log(err));
    });

    li.innerHTML = "";
    li.appendChild(inputField);
    li.appendChild(saveBtn);
};

const removeGoal = (goalId) => {
    axios.delete(`http://localhost:4000/api/goaldb/${goalId}`)
        .then(res => {
            displayGoals();
        })
        .catch(err => console.log(err));
};

const displayGoals = () => {
    axios.get("http://localhost:4000/api/goaldb")
        .then(res => {
            const goals = res.data;
            goalList.innerHTML = "";
            goals.forEach(goal => {
                const li = document.createElement("li");
                const goalText = document.createElement("span");
                const editBtn = document.createElement("button");
                const removeBtn = document.createElement("button");

                li.id = `goal-${goal.goalId}`;

                goalText.textContent = goal.goalName;
                goalText.style.fontSize = "36px"; 

                editBtn.textContent = "Edit";
                editBtn.style.backgroundColor = "#e8e474"; 
                editBtn.style.color = "black"; 
                editBtn.style.marginRight = "5px"; 
                removeBtn.textContent = "Remove";
                removeBtn.style.backgroundColor = "#e87a72"; 

                editBtn.addEventListener("click", () => editGoal(goal.goalId, goal.goalName));
                removeBtn.addEventListener("click", () => removeGoal(goal.goalId));

                li.appendChild(goalText);
                li.appendChild(editBtn);
                li.appendChild(removeBtn);
                goalList.appendChild(li);
            });
        })
        .catch(err => console.log(err));
};

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
addGoalBtn.addEventListener("click", addGoal);

displayGoals();