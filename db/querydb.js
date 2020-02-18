const db = require("../models/");

// db.Case.findOne({
//     where: {
//         country: "Mainland China",
//         caseDay: 1
//     }
// }).then(function(cb) {
//     console.log(cb.dataValues.id);
// });


db.Case.findAll({
    where: {
        country: "Others",
    }
}).then(function(cb) {
    let provinces = 0;
    for (let i = 0; i < cb.length; i++) {
        if (cb[i].dataValues.caseDay === 1) {
            provinces++;
        }
    }

    let caseDays = cb.length / provinces;

    let caseArr = [];
    let objCounter = 0;
    for (let i = 0; i < caseDays; i++) {
        let cases = 0;
        for (let j = 0; j < provinces; j++) {
            cases += cb[objCounter].dataValues.cases;
            objCounter++;
        }
        caseArr.push(cases)
    }
    console.log(caseArr);
});

