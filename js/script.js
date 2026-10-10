// Get HTML elements
let mortgageButton = document.getElementById("Button1");
let mortgageDisplay = document.getElementById("mortgage-display");
let monthlyDisplay = document.getElementById("monthly-display");

let INTEREST_RATE = 0.0575;

// On button click...
mortgageButton.addEventListener("click", function() {
    // Prompt users for inputs
    let loanAmount = Number(prompt("Enter the loan"
        + " amount without commas"));
    let termYears = Number(prompt("Enter the term"
        + " in years (30 or 15)"));

    // Validate inputs
    while (termYears != 30 && termYears != 15){
        alert("Please enter either '30' or '15'");
        termYears = Number(prompt("Enter the term"
            + " in years (30 or 15)"));
    }

    // Calculate monthly payment
    let monthlyPayment = (
    ((INTEREST_RATE / 12) * loanAmount) /
    (1 - Math.pow(1 + (INTEREST_RATE / 12),
    (termYears * -12)))).toFixed(2);

    // Calculate total interest and total paid
    let termMonths = termYears * 12;
    let totalInterest = (monthlyPayment * termMonths) - loanAmount;
    let totalLoan = loanAmount + totalInterest;

    // Display mortgage information
    mortgageDisplay.innerHTML = "For a mortgage lasting "
    + termYears + " years, with an interest rate of " + INTEREST_RATE
    + " and an original principal of $" + loanAmount.toFixed(2)
    + ":<br>$" + totalInterest.toFixed(2) + " will be the total "
    + "amount of interest paid<br>$" + totalLoan.toFixed(2)
    + " will be the total amount paid<br>$" + monthlyPayment
    + " to be paid each month";

    // Calculate and display loan status for each month
    let remainingBalance = totalLoan;

    for (let month = 1; month <= termMonths; month++){
        // Display pt. 1
        monthlyDisplay.innerHTML += "Month " + month
        + " you will pay $" + monthlyPayment + " and have $";

        // Calculate total
        remainingBalance -= monthlyPayment;

        // Display pt. 2
        if (remainingBalance <= 0){
            remainingBalance = 0
            monthlyDisplay.innerHTML += remainingBalance.toFixed(2)
            + " remaining to pay off.<br>"
            + "Ending...";
            return;
        }
        else
            monthlyDisplay.innerHTML += remainingBalance.toFixed(2)
            + " remaining to pay off.";
        
        monthlyDisplay.innerHTML += "<br>"
    }
})