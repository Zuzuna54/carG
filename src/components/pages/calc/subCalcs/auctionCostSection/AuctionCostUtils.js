

export const copartCalc = (carCostStr) => {

    let total = 0;
    let carCost = parseFloat(carCostStr);

    if (!carCost || carCost === 0) {
        return 0;
    }

    //High Volume Buyer Fee
    if (carCost < 99.99) {
        total += 1;
    }
    else if (carCost < 199.99) {
        total += 25;
    }
    else if (carCost < 299.99) {
        total += 60;
    }
    else if (carCost < 349.99) {
        total += 80;
    }
    else if (carCost < 399.99) {
        total += 90;
    }
    else if (carCost < 449.99) {
        total += 120;
    }
    else if (carCost < 499.99) {
        total += 130;
    }
    else if (carCost < 549.99) {
        total += 140;
    }
    else if (carCost < 599.99) {
        total += 150;
    }
    else if (carCost < 699.99) {
        total += 165;
    }
    else if (carCost < 799.99) {
        total += 185;
    }
    else if (carCost < 899.99) {
        total += 200;
    }
    else if (carCost < 999.99) {
        total += 215;
    }
    else if (carCost < 1199.99) {
        total += 230;
    }
    else if (carCost < 1299.99) {
        total += 255;
    }
    else if (carCost < 1399.99) {
        total += 275;
    }
    else if (carCost < 1499.99) {
        total += 280;
    }
    else if (carCost < 1599.99) {
        total += 290;
    }
    else if (carCost < 1699.99) {
        total += 305;
    }
    else if (carCost < 1799.99) {
        total += 315;
    }
    else if (carCost < 1999.99) {
        total += 325;
    }
    else if (carCost < 2399.99) {
        total += 355;
    }
    else if (carCost < 2499.99) {
        total += 380;
    }
    else if (carCost < 2999.99) {
        total += 400;
    }
    else if (carCost < 3499.99) {
        total += 450;
    }
    else if (carCost < 3999.99) {
        total += 500;
    }
    else if (carCost < 4499.99) {
        total += 600;
    }
    else if (carCost < 4999.99) {
        total += 625;
    }
    else if (carCost < 5999.99) {
        total += 650;
    }
    else if (carCost < 6499.99) {
        total += 675;
    }
    else if (carCost < 6999.99) {
        total += 675;
    }
    else if (carCost < 7499.99) {
        total += 700;
    }
    else if (carCost < 7999.99) {
        total += 700;
    }
    else if (carCost < 8499.99) {
        total += 725;
    }
    else if (carCost < 8999.99) {
        total = 725
    }
    else if (carCost < 9999.99) {
        total += 725;
    }
    else if (carCost < 10499.99) {
        total += 750;
    }
    else if (carCost < 10999.99) {
        total += 750;
    }
    else if (carCost < 11499.99) {
        total += 750;
    }
    else if (carCost < 11999.99) {
        total += 760;
    }
    else if (carCost < 12499.99) {
        total += 775;
    }
    else if (carCost < 14999.99) {
        total += 790;
    }
    else if (carCost > 14999.99) {
        total += (carCost * .06);
    }



    //Internet bid fee Live online bid fee
    if (carCost < 499.99) {
        total += 49;
    }
    else if (carCost < 999.99) {
        total += 59;
    }
    else if (carCost < 1499.99) {
        total += 79;
    }
    else if (carCost < 1999.99) {
        total += 89;
    }
    else if (carCost < 3999.99) {
        total += 99;
    }
    else if (carCost < 5999.99) {
        total += 109;
    }
    else if (carCost < 7999.99) {
        total += 139;
    }
    else if (carCost > 7999.99) {
        total = total + 149;
    }


    total += 10; //Eviromental fee
    total += 20; //Title fee
    total += 79; //Documentation fee

    return total;
}


export const iaaiCalc = (carCostStr) => {

    let total = 0;
    let carCost = parseFloat(carCostStr);

    if (!carCost || carCost === 0) {
        return 0;
    }


    //High Volume Buyer Fee
    if (carCost < 99.99) {
        total += 1;
    }
    else if (carCost < 199.99) {
        total += 25;
    }
    else if (carCost < 299.99) {
        total += 60;
    }
    else if (carCost < 349.99) {
        total += 80;
    }
    else if (carCost < 399.99) {
        total += 90;
    }
    else if (carCost < 449.99) {
        total += 120;
    }
    else if (carCost < 499.99) {
        total += 130;
    }
    else if (carCost < 549.99) {
        total += 140;
    }
    else if (carCost < 599.99) {
        total += 150;
    }
    else if (carCost < 699.99) {
        total += 165;
    }
    else if (carCost < 799.99) {
        total += 185;
    }
    else if (carCost < 899.99) {
        total += 200;
    }
    else if (carCost < 999.99) {
        total += 215;
    }
    else if (carCost < 1199.99) {
        total += 230;
    }
    else if (carCost < 1299.99) {
        total += 255;
    }
    else if (carCost < 1399.99) {
        total += 275;
    }
    else if (carCost < 1499.99) {
        total += 280;
    }
    else if (carCost < 1599.99) {
        total += 290;
    }
    else if (carCost < 1699.99) {
        total += 305;
    }
    else if (carCost < 1799.99) {
        total += 315;
    }
    else if (carCost < 1999.99) {
        total += 325;
    }
    else if (carCost < 2399.99) {
        total += 355;
    }
    else if (carCost < 2499.99) {
        total += 380;
    }
    else if (carCost < 2999.99) {
        total += 400;
    }
    else if (carCost < 3499.99) {
        total += 450;
    }
    else if (carCost < 3999.99) {
        total += 500;
    }
    else if (carCost < 4499.99) {
        total += 600;
    }
    else if (carCost < 4999.99) {
        total += 625;
    }
    else if (carCost < 5999.99) {
        total += 650;
    }
    else if (carCost < 6499.99) {
        total += 675;
    }
    else if (carCost < 6999.99) {
        total += 675;
    }
    else if (carCost < 7499.99) {
        total += 700;
    }
    else if (carCost < 7999.99) {
        total += 700;
    }
    else if (carCost < 8499.99) {
        total += 725;
    }
    else if (carCost < 8999.99) {
        total = 725
    }
    else if (carCost < 9999.99) {
        total += 725;
    }
    else if (carCost < 10499.99) {
        total += 750;
    }
    else if (carCost < 10999.99) {
        total += 750;
    }
    else if (carCost < 11499.99) {
        total += 750;
    }
    else if (carCost < 11999.99) {
        total += 760;
    }
    else if (carCost < 12499.99) {
        total += 775;
    }
    else if (carCost < 14999.99) {
        total += 790;
    }
    else if (carCost > 14999.99) {
        total += (carCost * .06);
    }

    //Internet bid fee Live online bid fee
    if (carCost < 499.99) {
        total += 49;
    }
    else if (carCost < 999.99) {
        total += 59;
    }
    else if (carCost < 1499.99) {
        total += 79;
    }
    else if (carCost < 1999.99) {
        total += 89;
    }
    else if (carCost < 3999.99) {
        total += 99;
    }
    else if (carCost < 5999.99) {
        total += 109;
    }
    else if (carCost < 7999.99) {
        total += 139;
    }
    else if (carCost > 7999.99) {
        total = total + 149;
    }

    total += 10; //Eviromental fee
    total += 35; //Broker fee 
    total += 79; //Documentation fee

    return total;
}
