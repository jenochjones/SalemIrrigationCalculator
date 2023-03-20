function ready(readyListener) {
    if (document.readyState !== "loading") {
        readyListener();
    } else {
        document.addEventListener("DOMContentLoaded", readyListener);
    }
};

ready(function () {

    const baseRateResidential = {
        1: 30.13,
        1.5: 41.79,
        2: 53.82,
    };

    const baseRateSchool = {
        2: 68.62,
        4: 272.95,
        6: 613.37,
    };

    const residentialRates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    };

    const residentialTiers = {
        tier1: 20000,
        tier2: 50000,
        tier3: 80000,
    };

    const school2inchRates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    };

    const school2inchTiers = {
        tier1: 50000,
        tier2: 151000,
        tier3: 249000,
    };

    const school4inchRates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    };

    const school4inchTiers = {
        tier1: 151000,
        tier2: 471000,
        tier3: 921000,
    };

    const school6inchRates = {
        tier1: 0.50,
        tier2: 1.05,
        tier3: 1.50,
        tier4: 2.20
    };

    const school6inchTiers = {
        tier1: 301000,
        tier2: 940000,
        tier3: 1831000,
    };

    let calculateBaseRate = function (myMeter) {
        let baseRate;
        let waterUsage = parseFloat(document.getElementById("water-usage").value) * 1000;

        if (document.getElementById("school-checkbox").checked) {
            baseRate = baseRateSchool;
        } else {
            baseRate = baseRateResidential;
        }

        document.getElementById("base-rate").innerHTML = `<p>$${baseRate[myMeter]}</p>`;
        calculateTiers(waterUsage);
    };

    let calculateTiers = function (waterUsage) {

        let isSchool;
        let baseRate;
        let currentRates;
        let currentTiers;
        
        if (document.getElementById("school-checkbox").checked) {
            isSchool = true;
            baseRate = baseRateSchool
        } else {
            isSchool = false;
            baseRate = baseRateResidential;
        }

        let myMeter = document.getElementById("meter-size").value;
        const monthlyRate = baseRate[myMeter];

        if (isSchool) {
            if (Number(myMeter) === 2) {
                currentTiers = school2inchTiers;
                currentRates = school2inchRates;
            } else if (Number(myMeter) === 4) {
                currentTiers = school4inchTiers;
                currentRates = school4inchRates;
            } else if (Number(myMeter) === 6) {
                currentTiers = school6inchTiers;
                currentRates = school6inchRates;
            } else {
                currentTiers = residentialTiers;
                currentRates = residentialRates;
            }
        } else {
            currentTiers = residentialTiers;
            currentRates = residentialRates;
        }
        
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
                tierThree = (waterUsage - currentTiers["tier2"]) * currentRates["tier3"] / 1000;
                tierFour = 0.00;
            }  else {
                tierOne = currentTiers["tier1"] * currentRates["tier1"] / 1000;
                tierTwo = (currentTiers["tier2"] - currentTiers["tier1"]) * currentRates["tier2"] / 1000;
                tierThree = (currentTiers["tier3"] - currentTiers["tier2"]) * currentRates["tier3"] / 1000;
                tierFour = (waterUsage - currentTiers["tier3"]) * currentRates["tier4"] / 1000;
            } 
        }

        document.getElementById("tier1description").innerHTML = `Tier 1 (0 to ${currentTiers["tier1"] / 1000} thousand gallons)`;
        document.getElementById("tier2description").innerHTML = `Tier 2 (${currentTiers["tier1"] / 1000} to ${currentTiers["tier2"] / 1000} thousand gallons)`;
        document.getElementById("tier3description").innerHTML = `Tier 3 (${currentTiers["tier2"] / 1000} to ${currentTiers["tier3"] / 1000} thousand gallons)`;
        document.getElementById("tier4description").innerHTML = `Tier 4 (${currentTiers["tier3"] / 1000} thousand gallons and above)`;

        document.getElementById("tier1").innerHTML = `<p>$${Math.round(tierOne * 100) / 100}</p>`;
        document.getElementById("tier2").innerHTML = `<p>$${Math.round(tierTwo * 100) / 100}</p>`;
        document.getElementById("tier3").innerHTML = `<p>$${Math.round(tierThree * 100) / 100}</p>`;
        document.getElementById("tier4").innerHTML = `<p>$${Math.round(tierFour * 100) / 100}</p>`;

        updateMonthlyBill(monthlyRate, tierOne, tierTwo, tierThree, tierFour);
    };

    let updateMonthlyBill = function (monthlyRate, tierOne, tierTwo, tierThree, tierFour) {
        const monthlyBill = monthlyRate + tierOne + tierTwo + tierThree + tierFour;
        document.getElementById("est-bill").innerHTML = `<p>$${Math.round(monthlyBill * 100) / 100}</p>`;
    };

    document.getElementById("meter-size").addEventListener("change", (event) => {
        let myMeter = event.target.value;
        calculateBaseRate(myMeter);
    });

    document.getElementById("water-usage").addEventListener("input", (event) => {
        const waterUsage = parseFloat(event.target.value) * 1000;
        calculateTiers(waterUsage);
    });

    document.getElementById("school-checkbox").addEventListener("change", (event) => {
        if (document.getElementById("school-checkbox").checked) {
            document.getElementById("meter-size").innerHTML = "<option>2</option><option>4</option><option>6</option>"
        } else {
            document.getElementById("meter-size").innerHTML = "<option>1</option><option>1.5</option><option>2</option>"
        }
        calculateBaseRate(document.getElementById("meter-size").value);
    });
});
