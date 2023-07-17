const goaldb = [
    {
        goalId:1,
        goalName:'Plant a tree'
    },
    {
        goalId:2,
        goalName:'Build a house'
    },
    {
        goalId:3,
        goalName:'Raise a child'
    },
]

let goalId =4;


module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = [
            'A short pencil is usually better than a long memory any day.',
            'A smile is your personal welcome mat.','Accept something that you cannot change, and you will feel better.',
            'All the troubles you have will pass away very quickly.',
            'Your difficulties will strengthen you.',
            'Your work interests can capture the highest status or prestige.'
        ];
        let randomIndex = Math.floor(Math.random() * fortunes.length);

        res.status(200).send(fortunes[randomIndex])
    },
    getGoals: (req, res) => {
        res.status(200).send(goaldb);
    },
    addGoal: (req, res) => {
        const { goalName } = req.body;
        const newGoal = {
            goalId: goalId++,
            goalName: goalName
        };
        goaldb.push(newGoal);
        res.status(200).send(newGoal);
    },
    updateGoal: (req, res) => {
        const { id } = req.params;
        const { goalName } = req.body;
        const goalToUpdate = goaldb.find(goal => goal.goalId === parseInt(id));
        if (goalToUpdate) {
            goalToUpdate.goalName = goalName;
            res.status(200).send(goalToUpdate);
        } else {
            res.status(404).send("Goal not found.");
        }
    },
    removeGoal: (req, res) => {
        const { id } = req.params;
        const goalIndex = goaldb.findIndex(goal => goal.goalId === parseInt(id));
        if (goalIndex !== -1) {
            const removedGoal = goaldb.splice(goalIndex, 1)[0];
            res.status(200).send(removedGoal);
        } else {
            res.status(404).send("Goal not found.");
        }
    }
}