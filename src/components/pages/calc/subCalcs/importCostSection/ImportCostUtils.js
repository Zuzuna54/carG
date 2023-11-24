

export const modelYears = [
    2024,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
    1999,
    1998,
    1997,
    1996,
    1995,
    1994,
    1993,
    1992,
    1991,
    1990,
    1989,
    1988,
    1987,
    1986,
    1985,
    1984,
    "1983 and older"
]


export const importCostCalculator = (modelYear, engineType, engineSizeStr, steeringPosition) => {

    if (modelYear === 'Pick a Model Year' || engineType === 'Pick an Engine Type' || steeringPosition === 'Pick a Steering Position' || engineSizeStr) {
        return 0
    }

    console.log(engineSizeStr)
    const engineSize = parseInt(engineSizeStr);
    console.log(engineSize)
    const currentYear = new Date().getFullYear()
    const carAge = currentYear - modelYear;
    let output = 0;

    if (engineType === "Gas" || engineType === "Diesel") {
        if (carAge <= 2) {
            output = engineSize * 1.5
        }
        else if (carAge <= 3) {
            output = engineSize * 1.4
        }
        else if (carAge <= 4) {
            output = engineSize * 1.2
        }
        else if (carAge <= 5) {
            output = engineSize * 1
        }
        else if (carAge <= 8) {
            output = engineSize * 0.8
        }
        else if (carAge <= 9) {
            output = engineSize * 0.9
        }
        else if (carAge <= 10) {
            output = engineSize * 1.1
        }
        else if (carAge <= 11) {
            output = engineSize * 1.3
        }
        else if (carAge <= 12) {
            output = engineSize * 1.5
        }
        else if (carAge <= 13) {
            output = engineSize * 1.8
        }
        else if (carAge <= 14) {
            output = engineSize * 2.1
        }
        else if (carAge > 14 && carAge <= 40) {
            output = engineSize * 2.4
        } else {
            output = engineSize * 1
        }


        output += 150; // add customs fee
        output += 200; // add registration fee
        output += (engineSize * 0.058) // add import fee
        output += 30 // add inspection fee
        output += 50 // add customs declaration fee
        output += 50 // add internal transit fee

    }

    if (engineType === "Electric") {

        output += 150; // add customs fee
        output += 200; // add registration fee
        output += 30 // add inspection fee
        output += 50 // add customs declaration fee
        output += 50 // add internal transit fee
    }

    if (engineType === "Hybrid") {

        output += 150; // add customs fee
        output += 200; // add registration fee
        output += (engineSize * 0.058) // add import fee
        output += 30 // add inspection fee
        output += 50 // add customs declaration fee
        output += 50 // add internal transit fee

        if (carAge <= 2) {
            output = engineSize * 0.6
        }
        else if (carAge <= 3) {
            output = engineSize * 0.56
        }
        else if (carAge <= 4) {
            output = engineSize * 0.48
        }
        else if (carAge <= 5) {
            output = engineSize * 0.4
        }
        else if (carAge <= 6) {
            output = engineSize * 0.32
        }
        else if (carAge <= 8) {
            output = engineSize * 0.8
        }
        else if (carAge <= 9) {
            output = engineSize * 0.9
        }
        else if (carAge <= 10) {
            output = engineSize * 1.1
        }
        else if (carAge <= 11) {
            output = engineSize * 1.3
        }
        else if (carAge <= 12) {
            output = engineSize * 1.5
        }
        else if (carAge <= 13) {
            output = engineSize * 1.8
        }
        else if (carAge <= 14) {
            output = engineSize * 2.1
        }
        else if (carAge > 14 && carAge <= 40) {
            output = engineSize * 2.4
        } else {
            output = engineSize * 1
        }



    }

    return output

}