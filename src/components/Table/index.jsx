
import { useMemo } from "react";

import PropTypes from "prop-types";

import { Box, Table as MuiTable, TableBody, TableContainer, TableRow, TableCell } from "@mui/material";
import { isEmpty } from "_services";

function Table({ columns, rows, pagination }) {

    const renderColumns = columns.map(({ name, label, align, type }, key) => {
        let pl;
        let pr;
        if (type == "serial_no") {
            name = "serial_no";
            if (label == undefined) {
                label = "SNO"
            }
        }
        if (key === 0) {
            pl = 3;
            pr = 3;
        } else if (key === columns.length - 1) {
            pl = 3;
            pr = 3;
        } else {
            pl = 1;
            pr = 1;
        }
        return (
            <Box
                key={name}
                component="th"
                pt={1.5}
                pb={1.25}
                pl={align === "left" ? pl : 3}
                pr={align === "right" ? pr : 3}
                textAlign={align}
                color="primary"
                opacity={0.9}
                borderBottom={`1px solid #eee`}
            >
                {label ? label : name.toUpperCase()}
            </Box>
        );
    });
    let serial_no = 1
    if (!isEmpty(pagination)) {
        serial_no = ((pagination.current - 1) * pagination.size) + 1;
    }
    const renderRows = rows.map((row, key) => {
        const rowKey = `row-${key}`;
        const tableRow = columns.map(({ name, align, type }) => {
            if (!row.hasOwnProperty(name) && type !== "serial_no") {
                return;
            }
            let tdata = null;
            if (type === "serial_no") {
                tdata = serial_no;
                serial_no++;
            } else {
                tdata = row[name]
            }
            let tdprops = {};
            let tdstyle = { padding: 5, margin: 2, textAlign: align };
            if (Array.isArray(tdata)) {
                tdata = row[name][1];
                tdprops = row[name][0];
            }
            if (tdprops["style"]) {
                tdstyle = { ...tdstyle, ...tdprops["style"] };
            }
            return (<TableCell key={name + key}  {...tdprops} style={tdstyle}>
                {tdata}</TableCell>);
        });
        return <TableRow key={rowKey}>{tableRow}</TableRow>;
    });

    return useMemo(
        () => (
            <TableContainer>
                <MuiTable>
                    <Box component="thead"
                        sx={{
                            backgroundColor: '#ff6c00f7',
                            color: '#fff'
                        }}
                    >
                        <TableRow>{renderColumns}</TableRow>
                    </Box>
                    <TableBody>{renderRows}</TableBody>
                </MuiTable>
            </TableContainer>
        ), [columns, rows]);
}

// Setting default values for the props of Table
Table.defaultProps = {
    columns: [],
    rows: [],
    pagination: {}
};

// Typechecking props for the Table
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object
};

export { Table };
