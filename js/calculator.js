function ready(readyListener) {
    if (document.readyState !== "loading") {
        readyListener();
    } else {
        document.addEventListener("DOMContentLoaded", readyListener);
    }
};

ready(function () {

    const baseRate = {
        1: 30.13,
        1.5: 41.79,
        2: 53.25,
        4: 53.25,
        6: 53.25
    }

    const residentialRates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    }

    const residentialTiers = {
        tier1: 20000,
        tier2: 50000,
        tier3: 80000,
    }

    const school_2inch_rates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    }

    const school_4inch_rates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    }

    const school_6inch_rates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    }

    let calculateTiers = function (waterUsage) {
        const isSchool = document.getElementById("school-checkbox").value;

        let myMeter = document.getElementById("meter-size").value;
        const monthlyRate = baseRate[myMeter];

        console.log(waterUsage)
        console.log(isSchool)

        const currentTiers = residentialTiers;
        const currentRates = residentialRates;

        let tierOne = 0.00;
        let tierTwo = 0.00;
        let tierThree = 0.00;
        let tierFour = 0.00;

        if (isNaN(waterUsage)) {
            tierOne = 0.00;
            tierTwo = 0.00;
            tierThree = 0.00;
            tierFour = 0.00;
        } else {
            if (waterUsage <= currentTiers["tier1"]) {
                tierOne = waterUsage * currentRates["tier1"] / 1000;
                tierTwo = 0.00;
                tierThree = 0.00;
                tierFour = 0.00;
            } else if (waterUsage <= currentTiers["tier2"]) {
                tierOne = currentTiers["tier1"] * currentRates["tier1"] / 1000;
                tierTwo = (waterUsage - currentTiers["tier1"]) * currentRates["tier2"] / 1000;
                tierThree = 0.00;
                tierFour = 0.00;
            } else if (waterUsage <= currentTiers["tier3"]) {
                tierOne = currentTiers["tier1"] * currentRates["tier1"] / 1000;
                tierTwo = (currentTiers["tier2"] - currentTiers["tier1"]) * currentRates["tier2"] / 1000;
                tierThree = waterUsage * currentRates["tier3"] / 1000;
                tierFour = 0.00;
            }  else {
                tierOne = currentTiers["tier1"] * currentRates["tier1"] / 1000;
                tierTwo = (currentTiers["tier2"] - currentTiers["tier1"]) * currentRates["tier2"] / 1000;
                tierThree = (currentTiers["tier3"] - currentTiers["tier2"]) * currentRates["tier3"] / 1000;
                tierFour = waterUsage * currentRates["tier4"] / 1000;
            } 
        }


        document.getElementById("tier1").innerHTML = `<p>$${Math.round(tierOne * 100) / 100}</p>`;
        document.getElementById("tier2").innerHTML = `<p>$${Math.round(tierTwo * 100) / 100}</p>`;
        document.getElementById("tier3").innerHTML = `<p>$${Math.round(tierThree * 100) / 100}</p>`;
        document.getElementById("tier4").innerHTML = `<p>$${Math.round(tierFour * 100) / 100}</p>`;

        updateMonthlyBill(monthlyRate, tierOne, tierTwo, tierThree, tierFour);
    }

    let updateMonthlyBill = function (monthlyRate, tierOne, tierTwo, tierThree, tierFour) {
        const monthlyBill = monthlyRate + tierOne + tierTwo + tierThree + tierFour;
        document.getElementById("est-bill").innerHTML = `<p>$${Math.round(monthlyBill * 100) / 100}</p>`;
    }

    console.log('ready');
    document.getElementById("meter-size").addEventListener("change", (event) => {
        let myMeter = event.target.value;
        let waterUsage = parseFloat(document.getElementById("water-usage").value) * 1000;

        document.getElementById("base-rate").innerHTML = `<p>$${baseRate[myMeter]}</p>`;
        calculateTiers(waterUsage);
    })

    document.getElementById("water-usage").addEventListener("input", (event) => {
        const waterUsage = parseFloat(event.target.value) * 1000;
        calculateTiers(waterUsage);
    })
});
