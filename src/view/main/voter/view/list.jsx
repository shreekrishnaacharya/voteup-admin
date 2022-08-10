// @mui material components
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import { Box, Card, styled, Typography } from "@mui/material";
// Soft UI Dashboard React example components
import { Table as rTable } from "components/Table";


import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getVoterList } from "../service";
import { useState } from "react";


const Table = styled(rTable)(
    ({ theme }) => ({
        "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
                borderBottom: `1px solid ${theme.gradients.blue1}`,
            },
        },
    })
);

function VotersList() {
    const [voterList, setVoter] = useState({
        voters: null,
        pg: {
            size: 0,
            pages: 0,
            current: 0,
            total: 0,
        }
    })
    // const classes = styles();
    const history = useHistory();
    const handleView = (id, name) => {
        history.push({
            pathname: itemPage.VOTER_VIEW,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }
    const handleClick = (e, current) => {
        if (pg.current != current) {
            loadData(current);
        }
    }

    async function loadData(page) {
        await getVoterList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    setVoter({
                        voters: res.data,
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
        loadData(0);
        // return () => {
        //     dispatch(setItemList({ items: [], pg: {} }));
        // }
    }, []);

    const TableRender = () => {

        if (voterList.voters === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (voterList.voters == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(voterList.voters, handleView)} />
                    <Box mt={1} mb={2} style={{ float: "right" }}>
                        {modelPages(pg, handleClick)}
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
                        <Typography variant="h6">{"Voters List"}</Typography>
                    </Box>
                    <Box customClass={classes.tables_table}>
                        <TableRender />
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}

export default VotersList;
