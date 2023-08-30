import {FC, ReactNode} from "react";
import {Card, CardContent} from "@mui/material";
import {Row} from "react-bootstrap";
import './SmartFloorStyle.css'

interface SmartFloorProps {
    children: ReactNode;
}
const SmartFloor:FC<SmartFloorProps> = ({children}) => {
    return (
        <Row>
            <Card id={'dvlpz_smart_floor'}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Row>
    );
};

export default SmartFloor;