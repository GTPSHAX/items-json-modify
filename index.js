const readline = require("readline");
const items = require("./items.json");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

async function poc() {
    let key;

    key = await askQuestion('Input key: ');
    if (!items.items[0][key]) {
        console.error("Key not found!");
        poc();
        return;
    }

    let value = await askQuestion('Input value: ');
    if (typeof items.items[0][key] == "number") {
        if (value.match(".")) value = parseFloat(value);
        else value = parseInt(key);
    }
    
    items.items.forEach(item => {
        item[key] = value;
    });

    fs.writeFileSync("./output.json", JSON.stringify(items, null, 2), "utf-8");
    console.log("Done");
    rl.close();
}

poc();