import React from 'react';
import { BarChart, Bar, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';

const BarChartComponent = ({orders, dataKey, color}) => {

  return (
      <div style={barChartStyle}>
        <BarChart width={1050} height={450} data={orders}>
          <XAxis dataKey="date" stroke="#565A5C" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#A2A4A3" strokeDasharray="4 4" />
          <Bar type="monotone" dataKey={dataKey} fill={color} barSize={30} />
          <Tooltip/>
          <Legend />
        </BarChart>
      </div>
  );
};

const barChartStyle = {
  width: '80%',
  textAlign: 'center'
};

export default BarChartComponent;
