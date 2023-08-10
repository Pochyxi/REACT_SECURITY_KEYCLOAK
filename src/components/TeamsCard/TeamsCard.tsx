import './style.css'
import {Card, CardContent} from "@mui/material";
import {Row} from "react-bootstrap";
import {FC} from "react";
import Teams from "../../interfaces/Teams.ts";
import {useNavigate} from "react-router-dom";


interface TeamsCardProps {
    teams: Teams | null
}


const TeamsCard: FC<TeamsCardProps> = (props: TeamsCardProps) => {

    const navigate = useNavigate();


    return (
        <Card
            id={'dvlpz_teams_card'}
            onClick={() => navigate(`/teams/team/${props.teams?.id}`)}
            sx={{width: '100%'}}>

            <CardContent>
                <Row className={'flex-column my-2'}>
                    <h2 className={'text-center'}>{props.teams?.teamName}</h2>
                </Row>
            </CardContent>
        </Card>
    );
};

export default TeamsCard;