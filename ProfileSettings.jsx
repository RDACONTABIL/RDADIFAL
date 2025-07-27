import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Save } from 'lucide-react';

const ProfileSettings = ({ profile, setProfile, onSave }) => {
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-400" />
          <span>Perfil do Usuário</span>
        </CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input id="cpf" value={profile.cpf} onChange={handleChange} placeholder="000.000.000-00" />
          </div>
          <div>
            <Label htmlFor="fullName">Nome Completo *</Label>
            <Input id="fullName" value={profile.fullName} onChange={handleChange} placeholder="Seu nome completo" />
          </div>
          <div>
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input id="birthDate" type="date" value={profile.birthDate} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input id="email" type="email" value={profile.email} onChange={handleChange} placeholder="seu@email.com" />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" value={profile.phone} onChange={handleChange} placeholder="(11) 99999-9999" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onSave} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Save className="h-4 w-4 mr-2" />
            Salvar Perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;