import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Save } from 'lucide-react';

const NotificationToggle = ({ label, description, isEnabled, onToggle }) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="text-sm font-medium text-white">{label}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <Button variant={isEnabled ? "default" : "outline"} size="sm" onClick={onToggle}>
      {isEnabled ? 'Ativado' : 'Desativado'}
    </Button>
  </div>
);

const NotificationSettings = ({ notifications, setNotifications, onSave }) => {
  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-yellow-400" />
          <span>Notificações</span>
        </CardTitle>
        <CardDescription>Configure como você deseja receber notificações</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <NotificationToggle
            label="Notificações por E-mail"
            description="Receba atualizações por e-mail"
            isEnabled={notifications.emailNotifications}
            onToggle={() => handleToggle('emailNotifications')}
          />
          <NotificationToggle
            label="Notificações SMS"
            description="Receba alertas por SMS"
            isEnabled={notifications.smsNotifications}
            onToggle={() => handleToggle('smsNotifications')}
          />
          <NotificationToggle
            label="Alertas de Cálculo"
            description="Notificações sobre novos cálculos"
            isEnabled={notifications.calculationAlerts}
            onToggle={() => handleToggle('calculationAlerts')}
          />
          <NotificationToggle
            label="Atualizações do Sistema"
            description="Notificações sobre atualizações"
            isEnabled={notifications.systemUpdates}
            onToggle={() => handleToggle('systemUpdates')}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={onSave} className="bg-gradient-to-r from-yellow-600 to-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;