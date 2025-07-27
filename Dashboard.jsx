
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Users, FileText, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Empresas Cadastradas', value: '247', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'Cálculos Este Mês', value: '1,234', change: '+23%', icon: Calculator, color: 'from-purple-500 to-pink-500' },
    { title: 'PDFs Gerados', value: '856', change: '+18%', icon: FileText, color: 'from-green-500 to-emerald-500' },
    { title: 'Notas com Alertas', value: '15', change: '+5', icon: AlertTriangle, color: 'from-orange-500 to-red-500' }
  ];

  const recentCalculations = [
    { company: 'Empresa ABC Ltda', cnpj: '12.345.678/0001-90', value: 'R$ 1.234,56', date: '2025-07-20' },
    { company: 'XYZ Comércio S.A.', cnpj: '98.765.432/0001-10', value: 'R$ 2.567,89', date: '2025-07-19' },
    { company: 'Tech Solutions ME', cnpj: '11.222.333/0001-44', value: 'R$ 987,65', date: '2025-07-18' },
    { company: 'Indústria Nova Ltda', cnpj: '55.666.777/0001-88', value: 'R$ 3.456,78', date: '2025-07-17' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-gray-400">Visão geral do sistema DIFAL para Julho 2025</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="glass-effect border-white/10 card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.icon === AlertTriangle ? 'text-orange-400' : 'text-green-400'}`}>{stat.change} vs mês anterior</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="glass-effect border-white/10 h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-400" />
                <span>Cálculos Recentes</span>
              </CardTitle>
              <CardDescription>Últimos cálculos de DIFAL realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalculations.map((calc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-white">{calc.company}</p>
                      <p className="text-sm text-gray-400">{calc.cnpj}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-400">{calc.value}</p>
                      <p className="text-sm text-gray-400">{calc.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
           <Card className="glass-effect border-white/10 h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <span>Demonstrativo da Receita</span>
              </CardTitle>
              <CardDescription>Visualização do crescimento</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full">
              <div className="w-full p-4">
                 <img  alt="Gráfico de receita com figuras humanas estilizadas" class="w-full h-auto object-contain" src="https://images.unsplash.com/photo-1586448354773-30706da80a04" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
