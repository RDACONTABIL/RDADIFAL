import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Trash2 } from 'lucide-react';

const DataManagement = ({ onExport, onClear }) => {
  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-purple-400" />
          <span>Gerenciamento de Dados</span>
        </CardTitle>
        <CardDescription>Exporte ou limpe seus dados do sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <h4 className="text-sm font-medium text-blue-400 mb-2">Exportar Dados</h4>
          <p className="text-sm text-gray-400 mb-4">
            Faça backup de todas as suas empresas, cálculos e configurações
          </p>
          <Button onClick={onExport} variant="outline" className="border-blue-500/50 hover:bg-blue-500/10">
            <Database className="h-4 w-4 mr-2" />
            Exportar Backup
          </Button>
        </div>
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <h4 className="text-sm font-medium text-red-400 mb-2">Limpar Dados</h4>
          <p className="text-sm text-gray-400 mb-4">
            Remove todos os dados do sistema. Esta ação não pode ser desfeita.
          </p>
          <Button onClick={onClear} variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400">
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar Todos os Dados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;