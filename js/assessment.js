
 // ===== PART B =====

const rawName = " uwase GRACE ";
const phone = "0788123456";
const monthlySaving = "15000";

// Convert the string to a number.
const savingNumber = Number(monthlySaving);

console.log("Original type:", typeof monthlySaving);
console.log("Converted type:", typeof savingNumber);

// Clean and format the name.
const cleanName = rawName.trim().toLowerCase();
const nameParts = cleanName.split(" ");

const firstName = nameParts[1];
const lastName = nameParts[0];

const fullName =
  firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " +
  lastName.charAt(0).toUpperCase() + lastName.slice(1);

console.log("Full name:", fullName);

// Initials.
const initials =
  firstName.charAt(0).toUpperCase() + "." +
  lastName.charAt(0).toUpperCase() + ".";

console.log("Initials:", initials);

// Mask the phone number.
const maskedPhone = phone.slice(0, 3) + "****" + phone.slice(-3);
console.log("Masked phone:", maskedPhone);

// Yearly savings and interest.
const yearlySaving = savingNumber * 12;
const yearlyInterest = yearlySaving * 0.05;

console.log(`Yearly saving: ${yearlySaving.toLocaleString("en-US")} RWF`);
console.log(`Yearly interest: ${yearlyInterest.toLocaleString("en-US")} RWF`);



 // ===== PART C: Loops and Arrays =====

// Members of the Ikimina savings group
const members = [
  { name: "Aline", level: "G", contributions: [20000, 20000, 15000, 25000] },
  { name: "Eric", level: "S", contributions: [10000, 5000, 10000, 5000] },
  { name: "Grace", level: "B", contributions: [] },
  { name: "Jean", level: "S", contributions: [15000, 15000, 15000, 15000] },
  { name: "Diane", level: "G", contributions: [30000, 25000, 20000, 30000] },
  { name: "Patrick", level: "B", contributions: [5000, 10000, 5000, 0] }
];

let groupTotal = 0;
let onTrackCount = 0;
let topSaver = "";
let topTotal = 0;

// for...of is suitable because we need each member object.
for (const member of members) {
  // Skip members who have not contributed yet.
  if (member.contributions.length === 0) {
    console.log(`${member.name}: no contributions yet.`);
    continue;
  }

  // Calculate this member's total using an accumulator.
  let memberTotal = 0;

  // A regular for loop lets us visit each contribution by index.
  for (let i = 0; i < member.contributions.length; i++) {
    memberTotal += member.contributions[i];
  }

  groupTotal += memberTotal;

  // Convert the member's level into a readable name.
  let levelName;

  switch (member.level) {
    case "G":
      levelName = "Gold";
      break;
    case "S":
      levelName = "Silver";
      break;
    case "B":
      levelName = "Bronze";
      break;
    default:
      levelName = "Unknown";
  }

  // Decide the member's savings status.
  let status;

  if (memberTotal >= 60000) {
    status = "On track";
    onTrackCount++;
  } else if (memberTotal >= 30000) {
    status = "Behind";
  } else {
    status = "At risk";
  }

  console.log(
    `${member.name} (${levelName}): ${memberTotal.toLocaleString("en-US")} RWF, ${status}`
  );

  // Build a simple bar: one star for each full 10,000 RWF.
  let bar = "";

  for (let star = 0; star < memberTotal / 10000; star++) {
    bar += "*";
  }

  console.log(bar);

  // Keep track of the member with the highest total.
  if (memberTotal > topTotal) {
    topTotal = memberTotal;
    topSaver = member.name;
  }
}

// Display group summary.
console.log(`Group total: ${groupTotal.toLocaleString("en-US")} RWF`);
console.log(`Members on track: ${onTrackCount}`);
console.log(
  `Top saver: ${topSaver} (${topTotal.toLocaleString("en-US")} RWF)`
);

// Calculate how many weeks are needed to reach 1,000,000 RWF.
const savingsGoal = 1000000;
const weeklyIncrease = groupTotal / 4;
let projectedTotal = groupTotal;
let weeks = 0;

// A while loop is suitable because the number of weeks is not known beforehand.
while (projectedTotal < savingsGoal) {
  projectedTotal += weeklyIncrease;
  weeks++;
}

console.log(`Weeks to reach goal: ${weeks}`);




 // ===== PART D =====
 // Functions and Problem-Solving

// Tests whether the actual result matches the expected result.
function check(actual, expected) {
    console.log(actual === expected ? "pass" : `FAIL: got ${actual}, expected ${expected}`);
}

// Formats an amount as Rwandan francs.
function formatRwf(amount) {
    if (typeof amount !== "number" || !Number.isFinite(amount)) {
        return "Invalid";
    }
    return `${Math.round(amount).toLocaleString("en-US")} RWF`;
}

// Masks the middle digits of a valid phone number.
function maskPhone(phone) {
    if (typeof phone !== "string" || phone.length !== 10 || !phone.startsWith("07")) {
        return "Invalid";
    }
    return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
}

// Adds all contributions using an accumulator.
function memberTotal(contributions) {
    if (!Array.isArray(contributions)) {
        return 0;
    }

    let total = 0;

    for (const contribution of contributions) {
        total += contribution;
    }

    return total;
}

// Returns a savings status or rejects a negative total.
function getStatus(total) {
    if (typeof total !== "number" || !Number.isFinite(total) || total < 0) {
        return "Invalid";
    } else if (total >= 60000) {
        return "On track";
    } else if (total >= 30000) {
        return "Behind";
    } else {
        return "At risk";
    }
}

// Calculates a loan limit using a default multiplier of 3.
function loanLimit(total, multiplier = 3) {
    if (typeof total !== "number" || !Number.isFinite(total) || total < 0 ||
        typeof multiplier !== "number" || !Number.isFinite(multiplier) || multiplier < 0) {
        return 0;
    }

    const limit = total * multiplier;

    if (limit > 500000) {
        return 500000;
    }

    return limit;
}

// Checks whether a total is On track.
const isOnTrack = (total) => getStatus(total) === "On track";

// Counts members whose total passes the supplied test callback.
function countMembers(list, test) {
    let count = 0;

    for (const member of list) {
        const total = memberTotal(member.contributions);

        if (test(total)) {
            count++;
        }
    }

    return count;
}

// Prints the savings report using the reusable functions above.
function printReport(list) {
    let groupTotal = 0;
    let onTrackCount = 0;
    let topSaver = "";
    let highestTotal = -1;

    for (const member of list) {
        if (member.contributions.length === 0) {
            console.log(`${member.name}: no contributions yet.`);
            continue;
        }

        const total = memberTotal(member.contributions);
        const status = getStatus(total);
        let levelName;

        switch (member.level) {
            case "G":
                levelName = "Gold";
                break;
            case "S":
                levelName = "Silver";
                break;
            case "B":
                levelName = "Bronze";
                break;
            default:
                levelName = "Unknown";
        }

        console.log(`${member.name} (${levelName}): ${formatRwf(total)}, ${status}`);

        let bar = "";
        for (let i = 0; i < Math.floor(total / 10000); i++) {
            bar += "*";
        }
        console.log(bar);

        groupTotal += total;

        if (status === "On track") {
            onTrackCount++;
        }

        if (total > highestTotal) {
            highestTotal = total;
            topSaver = member.name;
        }
    }

    console.log(`Group total: ${formatRwf(groupTotal)}`);
    console.log(`Members On track: ${onTrackCount}`);
    console.log(`Top saver: ${topSaver} (${formatRwf(highestTotal)})`);

    let projectedTotal = groupTotal;
    let weeks = 0;
    const weeklyAddition = groupTotal / 4;

    while (projectedTotal < 1000000 && weeklyAddition > 0) {
        projectedTotal += weeklyAddition;
        weeks++;
    }

    console.log(`Weeks to reach 1,000,000 RWF: ${weeks} weeks`);
}



// ===== PART D TESTS =====

// formatRwf: normal, boundary and invalid inputs.
check(formatRwf(15000), "15,000 RWF");
check(formatRwf(0), "0 RWF");
check(formatRwf("hello"), "Invalid");

// maskPhone: normal, boundary and invalid inputs.
check(maskPhone("0788123456"), "078****456");
check(maskPhone("0700000000"), "070****000");
check(maskPhone("123"), "Invalid");

// memberTotal: normal, empty and invalid inputs.
check(memberTotal([5000, 5000]), 10000);
check(memberTotal([]), 0);
check(memberTotal(null), 0);

// getStatus: normal, boundary and invalid inputs.
check(getStatus(60000), "On track");
check(getStatus(30000), "Behind");
check(getStatus(-5), "Invalid");

// loanLimit: normal, maximum cap and invalid inputs.
check(loanLimit(80000), 240000);
check(loanLimit(240000), 500000);
check(loanLimit(-5), 0);

// Display the loan limit results clearly.
console.log("===== LOAN LIMIT RESULTS =====");
console.log(`loanLimit(80000): ${loanLimit(80000)}`);
console.log(`loanLimit(240000): ${loanLimit(240000)}`);
console.log(`loanLimit(-5): ${loanLimit(-5)}`);

// isOnTrack: true, false and invalid cases.
check(isOnTrack(60000), true);
check(isOnTrack(59999), false);
check(isOnTrack(-5), false);

// Test the callback using three sample members.
const testMembers = [
    { name: "Aline", contributions: [40000, 20000] },
    { name: "Eric", contributions: [10000, 5000] },
    { name: "Jean", contributions: [30000, 30000] }
];

check(countMembers(testMembers, isOnTrack), 2);
check(countMembers([], isOnTrack), 0);
check(countMembers(testMembers, (total) => total > 100000), 0);

// Run the complete Ikimina report using the Part C data.
console.log("===== IKIMINA SAVINGS REPORT =====");
printReport(members);

