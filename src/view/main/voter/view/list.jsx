// @mui material components
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import { Box, Card, Typography } from "@mui/material";
// Soft UI Dashboard React example components
import { Table } from "components/Table";
import { voterPages } from "links";

import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getVoterList } from "../service";
import { useState } from "react";



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
            pathname: voterPages.VOTER_VIEW,
            search: `?id=${id}&name=${name.replace(" ", "-").toLowerCase()}`,
            state: {
                id,
                name
            }
        });
    }
    const handleClick = (e, current) => {
        if (voterList.pg.current !== current) {
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
        loadData(1);
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
                        {modelPages(voterList.pg, handleClick)}
                    </Box>
                </div>
            );
        }
    }

    return (
        <Card>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <Typography variant="h3">{"Voters"}</Typography>
            </Box>
            <Box>
                <TableRender />
            </Box>
        </Card>
    );
}

export default VotersList;
