import StarBorderIcon from '@mui/icons-material/StarBorder';
import Text from './Text';

export default function Ranking({ voters, votes, sx }) {
    const ranking = voters > 0 ? Math.round((votes / (voters)) * 10000) / 100 : 0
    return (
        <Text
            sx={{
                ...sx,
                display: 'flex'
            }}
            color={(ranking < 20 ? "error" : ranking < 50 ? "warning" : "success")}
        >
            <StarBorderIcon />{ranking + "%"}
        </Text>
    )
}