
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { TestCase } from '../types/models';

export interface Props {
    test_case: TestCase
}

export default function TestCaseCard({test_case}:Props) {
    const navigate = useNavigate();
    return (
        <Card key={test_case.id} sx={{ maxWidth: 345, minWidth: 345 }}>
            <CardActionArea onClick={(e) => {
                navigate(`/test-cases/${test_case.id}`, {
                    
                })
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {test_case.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {test_case.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}