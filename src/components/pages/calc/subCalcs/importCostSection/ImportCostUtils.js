
export const modelYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear; i >= 1984; i--) {
        years.push(i)
    }
    years.push(`1983 or older`)
    return years
}


export const importCostCalculator = (modelYear, engineType, engineSizeStr, usdToGelExchangeRate) => {

    if (modelYear === 'Pick a Model Year' || engineType === 'Pick an Engine Type' || !engineSizeStr || !usdToGelExchangeRate) {
        return 0
    }

    if (engineSizeStr === '0' || engineSizeStr === '') return 0;
    if (engineSizeStr[1] === '.' || engineSizeStr[1] === ',' || engineSizeStr[2] === ',' || engineSizeStr[2] === '.') {
        let firstDigit = '';
        let remainingDigits = ''
        const positonOfDecimal = engineSizeStr.indexOf('.')
        const positionOfComma = engineSizeStr.indexOf(',')

        positionOfComma > -1 ? firstDigit = engineSizeStr.slice(0, positionOfComma) : firstDigit = engineSizeStr.slice(0, positonOfDecimal)

        positionOfComma > -1 ? remainingDigits = engineSizeStr.slice(positionOfComma + 1) : remainingDigits = engineSizeStr.slice(positonOfDecimal + 1)

        const intFirstDigit = parseInt(firstDigit);
        const intRemainingDigits = parseInt(remainingDigits);

        engineSizeStr = intFirstDigit * 1000;
        remainingDigits ? engineSizeStr += intRemainingDigits * 100 : engineSizeStr += 0;

    }

    const engineSize = parseInt(engineSizeStr);
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

        output += 150; // add customs fee
        output += 200; // add registration fee
        output += (engineSize * 0.058) // add import fee
        output += 30 // add inspection fee
        output += 50 // add customs declaration fee
        output += 50 // add internal transit fee
    }

    return Math.round((output / usdToGelExchangeRate) * 10) / 10;

}