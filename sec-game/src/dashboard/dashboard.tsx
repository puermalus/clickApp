import React, { useEffect, useRef, useState } from "react";
import './dashboard.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import io from 'socket.io-client';

const host = "localhost:3001";

const Dashboard: React.FC = () => {
    const [messages, setMessages] = useState({ orange: 0, blue: 0 });

    const socket = io(host);
    useEffect(() => {

        socket.on("clickReceiver", msg => {
            setMessages(msg);
        });
        // socket.on("connection", (socket) => {
        //     console.log(socket);
        //     // socketRef.current = socket;
        // });
        // socket.on("message", msg => {
        //     setMessages(msg);
        // });
        //
        // socket.on("disconnect", msg => {
        //     console.log(msg);
        // })


    }, [socket]);

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className="App container" style={{ marginTop: 40 }}>
            <div className="chart">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </div>
            <div className="text-box-wrap">
                <div className="text-box orange">
                    {messages.orange}
                </div>
                <div className="text-box blue">
                    {messages.blue}
                </div>
            </div>

        </div>
    )
}

export default Dashboard;