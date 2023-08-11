import './style.css';
import {useEffect, useState} from "react";

const SoccerBall = () => {
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [rotating, setRotating] = useState(false);

    const moveBall = () => {
        let newLeft = Math.random() * (window.innerWidth - 50);
        let newTop = Math.random() * (window.innerHeight - 50);


        // Controllo i margini per evitare movimenti esterni al body
        if (left <= 0) newLeft = Math.abs(newLeft);
        if (top <= 0) newTop = Math.abs(newTop);
        if (left >= window.innerWidth - 50) newLeft = window.innerWidth - newLeft - 50;
        if (top >= window.innerHeight - 50) newTop = window.innerHeight - newTop - 50;

        setLeft(newLeft);
        setTop(newTop);
    };

    useEffect(() => {
        console.log('SoccerBall montato'); // Questo dovrebbe apparire nella console del browser
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Alterna la rotazione ad ogni intervallo
            setRotating(!rotating);
            moveBall();
        }, 5000);
        return () => clearInterval(interval);
    }, [left, top, rotating]);

    return (
        <div className={`soccer-ball-container ${rotating ? 'rotate' : ''}`}
             style={{
                 position: 'absolute', left: `${left}px`, top: `${top}px`, width: '50px', height: '50px'
        }}>
            <img src={`/soccer-ball-v2.svg`} alt="Soccer Ball" />
        </div>
    );
};

export default SoccerBall;