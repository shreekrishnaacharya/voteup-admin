
import { useMemo } from "react";

import PropTypes from "prop-types";


function Table({ columns, rows }) {

    const renderColumns = columns.map(({ name, label, align }, key) => {
        let pl;
        let pr;

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
            <th
                key={name}
                className="ui primary"
                style={{
                    textAlign: align,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    opacity: "0.9",
                    borderBottom: '1px solid #eee'
                }}
            >
                {label ? label : name.toUpperCase()}
            </th >
        );
    });

    const renderRows = rows.map((row, key) => {
        const rowKey = `row-${key}`;
        const tableRow = columns.map(({ name, align }) => {
            if (!row.hasOwnProperty(name)) {
                return;
            }
            let tdata = row[name];
            let tdprops = {};
            let tdstyle = { padding: 5, margin: 2, textAlign: align };
            if (Array.isArray(tdata)) {
                tdata = row[name][1];
                tdprops = row[name][0];
            }
            if (tdprops["style"]) {
                tdstyle = { ...tdstyle, ...tdprops["style"] };
            }
            return (<td key={name + key}  {...tdprops} style={tdstyle}>
                {tdata}</td>);
        });
        return <tr key={rowKey}>{tableRow}</tr>;
    });

    return useMemo(
        () => (
            <div>
                <table className="ui celled striped table">
                    <thead>
                        <tr>{renderColumns}</tr>
                    </thead>
                    <tbody>{renderRows}</tbody>
                </table>
            </div>
        ), [columns, rows]);
}

const Pagination = (props) => {
    const { totalPages, currentPage, onClick, padding } = props;
    let leftPage = [];
    let currentCount = currentPage < 1 ? 1 : currentPage;
    if (currentPage > padding + 1) {
        currentCount -= padding;
        leftPage[0] = <a key={1} className='ui label' onClick={(e) => onClick(e, 1)}><i>&lt;&lt;</i></a>
        leftPage[1] = <a key={currentPage - 1} className='ui label' onClick={(e) => onClick(e, currentPage - 1)}><i>&lt;</i></a>
    } else {
        currentCount = 1;
    }
    let currentPageLink = [];
    let counter = 0;
    while (currentCount <= (currentPage + padding)) {
        const pid = currentCount;//wow, hahaha this is interesting problem i came accross;
        currentPageLink[counter] = <a key={pid} className={`ui label ${currentPage == pid ? 'teal' : ''}`} onClick={(e) => { onClick(e, pid) }}>{pid}</a>
        if (pid >= totalPages) {
            break;
        }
        counter++;
        currentCount++;
    }
    currentCount--;
    let rightPage = [];
    if ((currentPage + padding) < totalPages) {
        rightPage[0] = <a key={currentPage + 1} className='ui label' onClick={(e) => onClick(e, currentPage + 1)}><i>&gt;</i></a>
        rightPage[1] = <a key={totalPages} className='ui label' onClick={(e) => onClick(e, totalPages)}><i>&gt;&gt;</i></a>
    }
    return (
        <div className="ui mini horizontal divided list">
            <div className="item">
                <div className="ui circular labels">
                    {leftPage}
                    {currentPageLink}
                    {rightPage}
                </div>
            </div>
        </div>
    );
};


// Setting default values for the props of Table
Table.defaultProps = {
    columns: [],
    rows: [],
};

// Typechecking props for the Table
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(PropTypes.object),
};

Pagination.defaultProps = {
    padding: 2
};

Pagination.propTypes = {
    padding: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
};
export { Table, Pagination };
