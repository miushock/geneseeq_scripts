exports.get_records = function () {
    XLSX = require('xlsx');
    var workbook = XLSX.readFile('./test.xlsx');
    var sheet_name_list = workbook.SheetNames;

    var records = [];

    for (i = 1; i < sheet_name_list.length; i++) {
        var ws = workbook.Sheets[sheet_name_list[i]];
        try {
            var row = 1;
            while (!ws['A' + row] || ws['A' + row].v !== 'id') {
                row += 1;
            }
            var key_row = row;
            row++;

            var mutants = [];
            var id_re = /^[A-Z0-9 _]*$/;

            while (ws['A' + row] && id_re.exec(ws['A' + row].v) !== null) {
                var col = 'A';
                var mutant = {};

                while (ws[col + row] && ws[col + key_row] && ws[col + row].v != '') {
                    mutant[ws[col + key_row].v] = ws[col + row].v;
                    col = inc_col(col);
                }
                row++;
                mutants.push(mutant);
            }
        } catch (e) {
            console.log(e);
            console.log(sheet_name_list[i]);
        }
        records.push(mutants);
    }
    return records;
};

function inc_col(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
}
