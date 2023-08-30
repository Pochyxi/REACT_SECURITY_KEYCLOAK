import {Card, CardContent} from "@mui/material";
import {Col, Row} from "react-bootstrap";

const BlockPage = () => {
    return (
        <Card>
            <CardContent>
                <Row>
                    <Col>
                        <img style={{width: '50%'}} src={'/blocked.svg'} alt={'stop'}/>
                        <img style={{width: '50%', color: 'red'}} src={'/blocked-stop.svg'}
                             alt={'stop-block'}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className={'text-center'} style={{fontWeight: 'bolder'}}>ACCEDI per
                            visualizzare la pagina</h5>
                    </Col>
                </Row>
            </CardContent>
        </Card>
    );
};

export default BlockPage;