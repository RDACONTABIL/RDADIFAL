import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const taxRegimes = [
  'Simples Nacional',
  'Lucro Presumido',
  'Lucro Real',
  'MEI'
];

const initialFormData = {
  name: '', cnpj: '', ie: '', im: '', uf: '', address: '', number: '', complement: '',
  cep: '', email: '', whatsapp: '', legalRepresentative: '', legalRepresentativeCpf: '',
  taxRegime: ''
};

const CompanyForm = ({ company, onSave, companiesCount, children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const isEditing = !!company;

  useEffect(() => {
    if (isEditing && company) {
      setFormData({ ...initialFormData, ...company });
    } else {
      setFormData(initialFormData);
    }
  }, [company, isEditing, isDialogOpen]);

  const handleOpenChange = (open) => {
    setIsDialogOpen(open);
    if (!open) {
      setFormData(initialFormData);
    }
  };
  
  const handleCepSearch = async () => {
    if(formData.cep.length < 8) {
        toast({ title: "CEP Inválido", description: "O CEP deve conter 8 dígitos.", variant: "destructive" });
        return;
    }
    toast({ title: "🚧 Buscando CEP...", description: "Esta funcionalidade será conectada a um serviço real." });
    // Mock API call
    setTimeout(() => {
        setFormData(prev => ({
            ...prev,
            address: "Avenida Simulada",
            uf: "SP"
        }));
        toast({ title: "Sucesso!", description: "Endereço preenchido (simulação)." });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cnpj && !formData.ie) {
      toast({ title: "Erro", description: "CNPJ ou Inscrição Estadual é obrigatório", variant: "destructive" });
      return;
    }
    if (!formData.uf || !formData.taxRegime) {
      toast({ title: "Erro", description: "UF e Regime Tributário são obrigatórios", variant: "destructive" });
      return;
    }
    if (!isEditing && companiesCount >= 1000) {
      toast({ title: "Limite atingido", description: "Máximo de 1.000 empresas por contador", variant: "destructive" });
      return;
    }
    onSave(formData);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEditing ? React.cloneElement(children, { onClick: () => setIsDialogOpen(true) }) : (
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />Nova Empresa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-effect border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Empresa' : 'Nova Empresa'}</DialogTitle>
          <DialogDescription>
            Preencha os dados da empresa. Campos com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="name">Nome da Empresa</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Razão social" /></div>
            <div><Label htmlFor="cnpj">CNPJ *</Label><Input id="cnpj" value={formData.cnpj} onChange={(e) => setFormData({...formData, cnpj: e.target.value})} placeholder="00.000.000/0000-00" /></div>
            <div><Label htmlFor="ie">Inscrição Estadual *</Label><Input id="ie" value={formData.ie} onChange={(e) => setFormData({...formData, ie: e.target.value})} placeholder="000.000.000.000" /></div>
            <div><Label htmlFor="im">Inscrição Municipal</Label><Input id="im" value={formData.im} onChange={(e) => setFormData({...formData, im: e.target.value})} placeholder="000000000" /></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <div className="flex gap-2">
                <Input id="cep" value={formData.cep} onChange={e => setFormData({...formData, cep: e.target.value})} placeholder="00000-000" />
                <Button type="button" variant="outline" onClick={handleCepSearch}><Search className="h-4 w-4 mr-2" />Buscar</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2"><Label htmlFor="address">Endereço</Label><Input id="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Rua, Avenida..." /></div>
            <div><Label htmlFor="number">Número</Label><Input id="number" value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} placeholder="Ex: 123" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="complement">Complemento</Label><Input id="complement" value={formData.complement} onChange={(e) => setFormData({...formData, complement: e.target.value})} placeholder="Apto, Bloco, etc." /></div>
            <div><Label htmlFor="uf">UF *</Label><Select value={formData.uf} onValueChange={(value) => setFormData({...formData, uf: value})}><SelectTrigger><SelectValue placeholder="Selecione o estado" /></SelectTrigger><SelectContent>{brazilianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="legalRepresentative">Responsável Legal</Label><Input id="legalRepresentative" value={formData.legalRepresentative} onChange={(e) => setFormData({...formData, legalRepresentative: e.target.value})} placeholder="Nome do responsável" /></div>
            <div><Label htmlFor="legalRepresentativeCpf">CPF do Responsável</Label><Input id="legalRepresentativeCpf" value={formData.legalRepresentativeCpf} onChange={(e) => setFormData({...formData, legalRepresentativeCpf: e.target.value})} placeholder="000.000.000-00" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="contato@empresa.com" /></div>
            <div><Label htmlFor="whatsapp">WhatsApp</Label><Input id="whatsapp" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} placeholder="(11) 99999-9999" /></div>
          </div>
          <div><Label htmlFor="taxRegime">Regime Tributário *</Label><Select value={formData.taxRegime} onValueChange={(value) => setFormData({...formData, taxRegime: value})}><SelectTrigger><SelectValue placeholder="Selecione o regime" /></SelectTrigger><SelectContent>{taxRegimes.map(regime => <SelectItem key={regime} value={regime}>{regime}</SelectItem>)}</SelectContent></Select></div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">{isEditing ? 'Atualizar' : 'Cadastrar'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyForm;