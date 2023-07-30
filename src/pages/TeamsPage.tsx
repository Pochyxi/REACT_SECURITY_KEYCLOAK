import {Container} from "react-bootstrap";
import NewTeamForm from "../components/forms/NewTeamForm.tsx";

const TeamsPage = () => {
    return (
        <Container fluid>
            <h1>Form per la creazione di un nuovo team</h1>
            <NewTeamForm />
        </Container>
    );
};

export default TeamsPage;