import {
  Typography,
  Box,
  Pagination,
  Skeleton,
  Badge
} from "@mui/material";


const stat = {
  "Reviwing": {
    "batch": "reviewing",
    "color": "info"
  },
  "Voting": {
    "batch": "voting",
    "color": "secondary"
  },
  "Accepted": {
    "batch": "accepted",
    "color": "success"
  },
  "Rejected": {
    "batch": "rejected",
    "color": "error"
  }
};
const colorList = ["info", "black", "warning"];
let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getLineChart = (dataL) => {
  let datasets = [];
  let montdata = [];
  let key = 0;
  Object.keys(dataL).forEach((ky) => {
    montdata = [];
    const monthL = dataL[ky].map(a => a.dat);
    monthList.forEach((month, mkey) => {
      if (monthL.indexOf(month) > -1) {
        montdata[mkey] = dataL[ky][monthL.indexOf(month)].cnt;
      } else {
        montdata[mkey] = 0;
      }
    });
    datasets[key] = {
      label: ky[0].toUpperCase() + ky.slice(1),
      color: colorList[key],
      data: montdata
    }
    key++;
  });

  return {
    labels: monthList,
    datasets
  };
};

const getVotePie = (dataL) => {
  let labels = [], data = [];
  dataL.forEach((da, i) => {
    labels[i] = da.label;
    data[i] = da.value;
  });
  return {
    labels,
    datasets: {
      data,
      hoverOffset: 4,
      backgroundColors: [
        "info",
        "success",
        "light",
        "dark"
        // 'rgb(255, 99, 132)',
        // 'rgb(54, 162, 235)',
        // 'rgb(255, 205, 86)'
      ],
    }
  };
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


function Status({ status }) {
  return (
    <Badge variant="gradient" badgeContent={stat[status].batch} color={stat[status].color} size="extra-small" />
  );
}

const modelList = (list, handleView) => {
  return list.map(({ _id, username, status, post_detail, supporters, down_vote, up_vote, review, create_at }) => {
    return {
      username: <Text text={username} />,
      post_detail: <Text text={post_detail} warpLength={1} />,
      review: <Text text={review} />,
      up_vote: <Text text={up_vote} />,
      down_vote: <Text text={down_vote} />,
      supporters: <Text text={supporters} />,
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
      username: [
        { "colSpan": "10", style: { textAlign: "center" } },
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
      username: [
        { "colSpan": "10" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      username: [
        { "colSpan": "10" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      username: [
        { "colSpan": "10" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}

const columns = [
  { label: "SNO", type: "serial_no", align: "center" },
  { name: "username", align: "left" },
  { name: "post_detail", align: "left" },
  { name: "review", align: "left" },
  { name: "up_vote", align: "left" },
  { name: "down_vote", align: "left" },
  { name: "supporters", align: "left" },
  { name: "create_at", align: "left", label: "Create At" },
  { name: "status", align: "center" },
  { name: "action", align: "center" },
];

const Temp = {
  Status
}



export {
  getLineChart,
  getVotePie,
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
}