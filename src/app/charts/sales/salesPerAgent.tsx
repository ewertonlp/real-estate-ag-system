"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { corretor: 'Ana Silva', vendas: 28 },
  { corretor: 'Carlos Oliveira', vendas: 34 },
  { corretor: 'Mariana Costa', vendas: 42 },
  { corretor: 'Pedro Santos', vendas: 23 },
  { corretor: 'Juliana Pereira', vendas: 37 },
  { corretor: 'Ricardo Fernandes', vendas: 31 },
  { corretor: 'Fernanda Almeida', vendas: 45 },
  { corretor: 'Lucas Ribeiro', vendas: 29 },
  { corretor: 'Amanda Gonçalves', vendas: 38 },
  { corretor: 'Gustavo Martins', vendas: 27 },
  { corretor: 'Beatriz Carvalho', vendas: 33 },
  { corretor: 'Rodrigo Lima', vendas: 40 },
];

export default function SalesPerAgentChart() {
  return (
    
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          
          <XAxis 
            type="number"
            tickFormatter={(value) => value.toLocaleString()}
            tick={{ fill: "var(--text)", fontSize: "0.875rem" }}
            axisLine={{ stroke: 'var(--text)' }}
            label={{ 
              value: 'Número de Vendas',
              position: 'bottom',
              offset: -5,
              fill: 'var(--text)'
            }}
          />
          
          <YAxis 
            type="category" 
            dataKey="corretor" 
            tick={{ fill: "var(--text)", fontSize: "0.875rem" }}
            width={150}
            axisLine={{ stroke: 'var(--text)' }}
            tickLine={{ stroke: 'var(--text)' }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
            }}
            formatter={(value) => [value.toLocaleString(), 'Vendas']}
            labelStyle={{ color: '#e5e7eb' }}
          />

          <Legend 
            formatter={() => 'Total de Vendas'}
            wrapperStyle={{ paddingTop: '20px' }}
          />

          <Bar
            dataKey="vendas"
            fill="#ff9137"
            radius={[0, 4, 4, 0]}
            barSize={18}
            name="Vendas"
          />
        </BarChart>
      </ResponsiveContainer>
   
  );
}