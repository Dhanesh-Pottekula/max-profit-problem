function maxProfit(time) {
    // Initialize earnings and solutions
    let earnings = 0;
    let solutions = [];

    // Dynamic programming table to store maximum earnings at each time unit
    let dp = new Array(time + 1).fill(0);

    // Loop through each time unit
    for (let t = 1; t <= time; t++) {
        // Initialize earnings for this time unit
        let maxEarnings = dp[t - 1];
        let bestChoice = null;

        // Try building a theatre
        if (t >= 5) {
            let earningsTheatre = dp[t - 5] + 1500;
            if (earningsTheatre > maxEarnings) {
                maxEarnings = earningsTheatre;
                bestChoice = ['T', Math.floor(t / 5), 0, 0];
            }
        }

        // Try building a pub
        if (t >= 4) {
            let earningsPub = dp[t - 4] + 1000;
            if (earningsPub > maxEarnings) {
                maxEarnings = earningsPub;
                bestChoice = ['P', t - Math.floor(t / 4) * 4, 0, 0];
            }
        }

        // Try building a commercial park
        if (t >= 10) {
            let earningsPark = dp[t - 10] + 3000;
           
            if (earningsPark > maxEarnings) {
                maxEarnings = earningsPark;
                bestChoice = ['C', Math.floor(t / 10), 0, 0];
            }
        }

        // Update earnings and solutions for this time unit
        dp[t] = maxEarnings;
        solutions.push(bestChoice);
    }
    
    // Reconstruct solution
    let finalSolution = [];
    let idx = time;
    while (idx > 0) {
        let choice = solutions[idx - 1];
        if (choice !== null) {
            finalSolution.push(choice);
            idx -= choice[0] === 'T' ? 5 : choice[0] === 'P' ? 4 : 10;
        } else {
            idx--;
        }
    }
    finalSolution.reverse();

    // Calculate total earnings
    earnings = dp[time];

    // Format output
    let formattedSolution = [];
    for (let s of finalSolution) {
        formattedSolution.push(`${s[0]}: ${s[1]}`);
    }

    return [earnings, formattedSolution.join(', ')];
}

// Test cases
let testCases = [[7, 3000], [8, 4500], [13, 16500]];

for (let [time, expectedEarnings] of testCases) {
    let [earnings, solution] = maxProfit(time);
    console.log("Time Unit:", time);
    console.log("Expected Earnings:", expectedEarnings);
    console.log("Solution:", solution);
    console.log();
}
