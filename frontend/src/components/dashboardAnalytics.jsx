import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Line } from "react-chartjs-2";

const options = { 
    elements: { 
        line: { 
            tension: 0.4,
        }
    },
    scales: {
        x: {
            display: true,
        },
    }
}

function DashboardAnalytics() {
    let params = useParams();
    const location = useLocation();
    const [shop, setShop] = useState();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [graphData, setGraphData] = useState({});

    const views = [
        {
            day: 1,
            views: 0,
        },
        {
            day: 2,
            views: 1,
        },
        {
            day: 3,
            views: 3,
        },
        {
            day: 4,
            views: 5,
        },
        {
            day: 5,
            views: 2,
        },
        {
            day: 6,
            views: 3,
        },
        {
            day: 7,
            views: 7,
        },
        {
            day: 8,
            views: 5,
        },
    ]
    useEffect(() => {
        setGraphData({
            labels: views.map((item) => item.day),
            datasets: [
                {
                    label: "Views",
                    backgroundColor: "rgb(0, 99, 132)",
                    borderColor: "rgb(0, 99, 132)",
                    data: views.map((item) => item.views),
                }
            ],
        });
    }, [views]);

    return (<Line options={options} data={graphData} />);
}

export default DashboardAnalytics;