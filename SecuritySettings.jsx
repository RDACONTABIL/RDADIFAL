import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SecuritySettings = () => {
  const { toast } = useToast();

  const handleChangePassword = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-400" />
          <span>Segurança</span>
        </CardTitle>
        <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="currentPassword">Senha Atual</Label>
          <Input id="currentPassword" type="password" placeholder="Digite sua senha atual" />
        </div>
        <div>
          <Label htmlFor="newPassword">Nova Senha</Label>
          <Input id="newPassword" type="password" placeholder="Digite sua nova senha" />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirme sua nova senha" />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleChangePassword} className="bg-gradient-to-r from-green-600 to-blue-600">
            <Save className="h-4 w-4 mr-2" />
            Alterar Senha
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;