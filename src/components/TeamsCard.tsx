import CardTheme from "../themes/CardTheme.ts";
import {Card, CardContent} from "@mui/material";
import {Row} from "react-bootstrap";
import {ThemeProvider} from "@mui/material/styles";
import {FC} from "react";
import Teams from "../interfaces/Teams.ts";
import {useNavigate} from "react-router-dom";


interface TeamsCardProps {
    teams: Teams | null
}


const TeamsCard: FC<TeamsCardProps> = (props:TeamsCardProps) => {

    const navigate = useNavigate();



    return (
        <ThemeProvider theme={CardTheme}>
            {
                <Card
                    onClick={() => navigate(`/teams/team/${props.teams?.id}`)}
                    sx={{width: '100%'}}>

                    <CardContent>
                        <Row className={'flex-column my-2'}>
                            <h1 className={'text-center'}>{props.teams?.teamName}</h1>
                        </Row>
                    </CardContent>
                </Card>
            }

        </ThemeProvider>
    );
};

export default TeamsCard;