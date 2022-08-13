// @mui material components
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import { Box, Card, Typography } from "@mui/material";
// Soft UI Dashboard React example components
import { Table } from "components/Table";
import { reportPages } from "links";

import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getReports } from "../service";
import { useState } from "react";

function ReportsList() {
    const [reportList, setReports] = useState({
        reports: null,
        pg: {
            size: 0,
            pages: 0,
            current: 0,
            total: 0,
        }
    })
    // const classes = styles();
    const history = useHistory();
    const handleView = (id) => {
        history.push({
            pathname: reportPages.REPORT_VIEW,
            search: "?id=" + id,
            state: {
                id,
                name
            }
        });
    }
    const handleClick = (e, current) => {
        if (reportList.pg.current !== current) {
            loadData(current);
        }
    }

    async function loadData(page) {
        await getReports({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    setReports({
                        reports: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    });
                }
            }

        });
    }
    useEffect(() => {
        loadData(1);
        // return () => {
        //     dispatch(setItemList({ items: [], pg: {} }));
        // }
    }, []);

    const TableRender = () => {

        if (reportList.reports === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (reportList.reports == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table pagination={reportList.pg} columns={columns} rows={modelList(reportList.reports, handleView)} />
                    <Box mt={1} mb={2} style={{ float: "right" }}>
                        {modelPages(reportList.pg, handleClick)}
                    </Box>
                </div>
            );
        }
    }

    return (
        <Box py={3}>
            <Box mb={3}>
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <Typography variant="h3">{"Reports"}</Typography>
                    </Box>
                    <Box>
                        <TableRender />
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}

export default ReportsList;
