import React, { useEffect, useRef, useState } from "react";
import './dashboard.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import io from 'socket.io-client';

const host = "localhost:3001";

const Dashboard: React.FC = () => {
    const [messages, setMessages] = useState({ orange: 0, blue: 0 });
    const [chartData, setChartData] = useState([
        {
            name: '0',
            orange: 0,
            blue: 0,

        },
        {
            name: '0,5',
            orange: 0,
            blue: 0,

        },
        {
            name: '1',
            orange: 0,
            blue: 0,

        },
        {
            name: '1.5',
            orange: 0,
            blue: 0,

        },
        {
            name: '2',
            orange: 0,
            blue: 0,

        },
        {
            name: '2.5',
            orange: 0,
            blue: 0,

        },
        {
            name: '2.5',
            orange: 0,
            blue: 0,

        },
        {
            name: '3.5',
            orange: 0,
            blue: 0,

        },
        {
            name: '4',
            orange: 0,
            blue: 0,

        },
        {
            name: '4.5',
            orange: 0,
            blue: 0,

        },
        {
            name: '5',
            orange: 0,
            blue: 0,

        },

    ]);


    useEffect(() => {
        const socket = io(host);
        socket.on("clickReceiver", msg => {
            setMessages(msg);
        });
        socket.on("chart", msg => {
            setChartData([
                {
                    name: '0',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '0,5',
                    orange: msg.orange,
                    blue: msg.blue,

                },
                {
                    name: '1',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '1.5',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '2',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '2.5',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '2.5',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '3.5',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '4',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '4.5',
                    orange: 0,
                    blue: 0,

                },
                {
                    name: '5',
                    orange: 0,
                    blue: 0,

                },

            ])
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


    });
    return (
        <div className="App container" style={{ marginTop: 40 }}>
            <div className="chart">
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
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
                    <Line type="monotone" dataKey="orange" stroke="#ff9559" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="blue" stroke="#007aff" />
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