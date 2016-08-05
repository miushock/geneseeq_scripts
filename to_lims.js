var csv = require('csv');
var fs = require('fs');
var snvFile = './SNV_RESULT.csv',
    cnvFile = './CNV_RESULT.csv',
    svFile = './SV_RESULT.csv';


function classify(mutant) {
    if (mutant['type'] === 'SNP') {
        if (mutant['Gene'] === 'GSTM1' || mutant['Gene'] === 'GSTT1') {
            return 'CNV';
        } else
            return 'SNV';
    }

    if (mutant['type'] === 'Mutant' || mutant['type'] === 'Gemline') {
        return 'SNV';
    }

    return mutant['type'];
}

function append(target, record) {
    fs.readFile(target, (err, data) => {
        csv.parse(data, (err, data) => {
            data = data.concat(record);
            csv.stringify(data, (err, data) => {
                fs.writeFile(target, data, (err) => {
                });
            });
        });
    });
}

function snv_map(mutant) {
    return ['lala', 'lalala', 'muahah'];
}

function cnv_map(mutant) {
    return ['lala', 'lalala', 'muahah'];
}

function sv_map(mutant) {
    return ['lala', 'lalala', 'muahah'];
}

let snv_records = [];
let cnv_records = [];
let sv_records = [];

xform = require('./transform.js');
records = xform.get_records();
for (i = 0; i < records.length; i++) {
    for (j = 0; j < records[i].length; j++) {
        //console.log(records[i][j]);
        mutant = records[i][j];
        if (classify(mutant) === 'SNV') {
            snv_records.push(snv_map(mutant));
        }
        if (classify(mutant) === 'CNV') {
            cnv_records.push(cnv_map(mutant));
        }
        if (classify(mutant) === 'SV') {
            sv_records.push(sv_map(mutant));
        }
    }
}

append(snvFile, snv_records);
append(cnvFile, cnv_records);
append(svFile, sv_records);
