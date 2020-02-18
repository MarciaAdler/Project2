const db = require("../models/");

// db.Case.findOne({
//     where: {
//         country: "Mainland China",
//         caseDay: 1
//     }
// }).then(function(cb) {
//     console.log(cb.dataValues.id);
// });


const findCases = (countryQ) => db.Case.findAll({
    where: {
        country: countryQ
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
            cases +=  cb[objCounter].dataValues.cases;
            objCounter++;
        }
        caseArr.push(cases)
    }
    let newArray = caseArr.map(function(aCase) {
        return { y: aCase};
    });
    
    // console.log(cb);
    // console.log(caseArr);
});

// findCases(process.argv[2]);


db.Case.findAll({
    
}).then(function(cb) {
    let provinces = 0;
    for (let i = 0; i < cb.length; i++) {
        if (cb[i].dataValues.caseDay === 1) {
            provinces++;
        }
    }

    let coords = [];

    for (let k = 0; k < provinces; k++) {
        coords.push(
            { province: cb[k].dataValues.province,
              country: cb[k].dataValues.country,
              lat: cb[k].dataValues.lat ,
              long: cb[k].dataValues.long
             }
        )
    }

    console.log(coords);
});

// module.exports = newArray;


