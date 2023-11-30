//Helper fucntion to check if the email is valid
export const validateEmail = (email: string): boolean => {

    console.log(`initiating validateEmail \n`);

    //Regex to validate email
    const emailRegex: RegExp = /\S+@\S+\.\S+/;
    console.log(`emailRegex: ${emailRegex}`);

    //Validate the email
    console.log(`Validating the email\n`)
    const emailValidated: boolean = emailRegex.test(email);
    console.log(`emailValidated: ${emailValidated}`);

    return emailValidated

};