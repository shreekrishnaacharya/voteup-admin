/* eslint-disable react/prop-types */
// Soft UI Dashboard React components

import {
  Avatar,
  Typography,
  Box,
  Pagination,
  Skeleton,
  Badge
} from "@mui/material";

const stat = {
  "Pending": {
    "batch": "pending",
    "color": "info"
  },
  "Ignore": {
    "batch": "ignore",
    "color": "secondary"
  },
  "Action": {
    "batch": "closed",
    "color": "primary"
  }
};
function Pimg({ image, name, code }) {
  return (
    <Box display="flex"
      alignItems="center"
      px={2}
      py={0.5}
    >
      <Avatar src={image} alt={name} size="sm" variant="rounded" />
    </Box>
  );
}

function Text({ text, edge, warpLength }) {
  return (
    <Box display="flex"
      pl={edge ? 2.5 : 0.5}
      pr={edge ? 2.5 : 0.5}
      pt={1.5}
      pb={1.25}
    >
      <Typography
        warpLength={warpLength}>
        {text}
      </Typography>
    </Box>
  );
}

function Name({ name, code }) {
  return (
    <Box display="flex"
      flexDirection="column"
    >
      <Typography variant="button" fontWeight="medium">
        {name}
      </Typography>
      <Typography variant="caption">
        {code}
      </Typography>
    </Box>
  );
}


function Status({ status }) {
  console.log(stat[status], status)
  return (
    <Badge variant="gradient" badgeContent={stat[status].batch} color={stat[status].color} size="extra-small" />
  );
}

function Type({ type }) {
  return (
    <Badge variant="gradient" badgeContent={type} color={type == "POST" ? "primary" : "secondary"} size="extra-small"/>
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
            textColor="primary"
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
          textColor="secondary"
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
  console.log(pagination)
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
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
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
