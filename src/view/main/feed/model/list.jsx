import contactImg from 'assets/images/contact.png';

const stat = {
  1: {
    "batch": "active",
    "color": "green"
  },
  0: {
    "batch": "inactive",
    "color": "red"
  }
};
function Pimg({ image, name, code }) {
  return (
    <div className='ui padded'>
      <img
        onError={(e) => {
          e.target.src = contactImg;
        }}
        src={image} alt={name} className="ui avatar image" />
    </div>
  );
}

function Text({ text, edge, warpLength }) {
  return (
    <div style={{ padding: "5px" }}>
      <span>
        {text}
      </span>
    </div>
  );
}

function Status({ status }) {
  return (
    <div className={"ui " + stat[status].color + " horizontal label"}>{stat[status].batch}</div>
  );
}

function Contacts({ contacts }) {
  return contacts.map(({ type, contact }) => {
    return (
      <div>{type}&nbsp;:&nbsp;{contact};</div>
    );
  });
}

const modelList = (list, handleView) => {
  return list.map(({ _id, image, name, fkLocation }) => {
    return {
      image: <Pimg image={image} name={name} />,
      name: <Text text={name} />,
      address: <Text text={fkLocation.name} wordLength={20} />,
      action: (
        <a style={{ cursor: "pointer" }} onClick={() => { handleView(_id, name) }}>
          <span>View</span>
        </a>
      ),
    }
  });
}

const modelListEmpty = () => {
  return [
    {
      image: [
        { "colSpan": "4", style: { textAlign: "center" } },
        <span className='ui sub header'>No data found</span>
      ],
    }
  ]
}




const columns = [
  { name: "image", align: "left" },
  { name: "name", align: "left" },
  { name: "address", align: "left" },
  { name: "action", align: "center" },
];

const Temp = {
  Status,
  Contacts,
  Pimg
}


export {
  columns,
  Temp,
  modelList,
  modelListEmpty,
};
