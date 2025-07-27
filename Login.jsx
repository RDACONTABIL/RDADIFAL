import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleFeatureNotImplemented = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({
        title: "Erro de Validação",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className="w-full max-w-md glass-effect border-white/10 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center pulse-glow">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">Bem-vindo ao DIFAL Pro</CardTitle>
            <CardDescription>Faça login para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Mínimo 6 caracteres" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Button type="button" variant="link" className="p-0 text-blue-400" onClick={handleFeatureNotImplemented}>
                  Esqueceu a senha?
                </Button>
                <Button type="button" variant="link" className="p-0 text-blue-400" onClick={handleFeatureNotImplemented}>
                  Criar conta
                </Button>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6">
                Entrar
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Button variant="outline" className="w-full hover:bg-white/10" onClick={handleFeatureNotImplemented}>
                <img  alt="ICP Brasil Logo" className="h-5 w-5 mr-2" src="https://images.unsplash.com/photo-1597930415954-b0a62f2b1c6f" />
                Entrar com Certificado Digital
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;