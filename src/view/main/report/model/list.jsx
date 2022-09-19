/* eslint-disable react/prop-types */
// Soft UI Dashboard React components

import {
  Typography,
  Box,
  Pagination,
  Skeleton,
  Badge
} from "@mui/material";
import Txt from "components/Text";

const stat = {
  "Pending": {
    "batch": "pending",
    "color": "info"
  },
  "Ignore": {
    "batch": "ignore",
    "color": "secondary"
  },
  "Closed": {
    "batch": "closed",
    "color": "error"
  }
};



function Text({ text, edge, warpLength }) {
  return (
    <Box display="flex"
      pl={edge ? 2.5 : 0.5}
      pr={edge ? 2.5 : 0.5}
      pt={1.5}
      pb={1.25}
    >
      <Txt
        warpLength={warpLength}>
        {text}
      </Txt>
    </Box>
  );
}



function Status({ status }) {
  return (
    <Badge variant="gradient" badgeContent={stat[status].batch} color={stat[status].color} size="extra-small" />
  );
}

function Type({ type }) {
  return (
    <Badge variant="gradient" badgeContent={type} color={type == "POST" ? "primary" : "secondary"} size="extra-small" />
  );
}
const modelList = (list, handleView) => {
  return list.map(({ _id, user, status, remark, type, create_at }) => {
    return {
      user: <Text text={user} />,
      remark: <Text text={remark} warpLength={1} />,
      type: <Type type={type} />,
      status: <Status status={status} />,
      create_at: <Text text={create_at} />,
      action: (
        <a style={{ cursor: "pointer" }} onClick={() => { handleView(_id) }}>
          <Typography
            variant="caption"
            fontWeight="medium"
          >View</Typography>
        </a>
      ),
    }
  });
}

const modelListEmpty = () => {
  return [
    {
      image: [
        { "colSpan": "7", style: { textAlign: "center" } },
        <Typography
          component="span"
          fontWeight="medium"
          p={20}
        >No data found</Typography>
      ],
    }
  ]
}

// const pageList = ({ pages, active, current }, handleNav) => {
//   let PagesList = [];
//   const pagelist = pages > 10 ? 10 : pages;
//   if (pages > 1) {
//     for (let i = 1; i <= pagelist; i++) {
//       PagesList[i - 1] = (
//         <SuiPagination
//           active={i === current}
//           onClick={handleNav(i, active)}
//           item
//         >
//           {i}
//         </SuiPagination>
//       );
//     }
//   }
//   return PagesList;
// }

const modelPages = (pagination, handleNav) => {
  return (
    <Pagination variant="outlined"
      count={Math.ceil(pagination.total / pagination.size)}
      page={pagination.current}
      color="primary"
      siblingCount={2}
      boundaryCount={2}
      onChange={handleNav}
    />
  );
};

const modelListInit = () => {
  return [
    {
      user: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      user: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      user: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}

const columns = [
  { label: "SNO", type: "serial_no", align: "center" },
  { name: "user", align: "left" },
  { name: "remark", align: "left" },
  { name: "create_at", align: "left", label: "Create At" },
  { name: "type", align: "center" },
  { name: "status", align: "center" },
  { name: "action", align: "center" },
];

const Temp = {
  Status,
  Type
}


export {
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
