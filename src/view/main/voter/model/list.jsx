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


function Status({ status, ...rest }) {
  return (
    <Badge variant="gradient" badgeContent={status} color={status == "Active" ? "success" : "error"} {...rest} />
  );
}

function Kyc({ kyc, ...rest }) {
  return (
    <Badge
      sx={{
        ".MuiBadge-badge": {
          width: "70px"
        }
      }}
      variant="gradient" badgeContent={kyc} color={kyc == "Verified" ? "success" : "warning"
      } {...rest} />
  );
}

const modelList = (list, handleView) => {
  return list.map(({ _id, name, status, contact, email, kyc, image }) => {
    return {
      image: <Pimg image={image} name={name} />,
      name: <Text text={name} />,
      email: <Text text={email} />,
      contact: <Text text={contact} />,
      kyc: <Kyc kyc={kyc} />,
      status: <Status status={status} size="extra-small" />,
      action: (
        <a style={{ cursor: "pointer" }} onClick={() => { handleView(_id, name) }}>
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
  { name: "image", align: "left" },
  { name: "name", align: "left" },
  { name: "email", align: "left" },
  { name: "contact", align: "left" },
  { name: "kyc", align: "center" },
  { name: "status", align: "center" },
  { name: "action", align: "center" },
];

const Temp = {
  Status,
  Kyc
}


export {
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
