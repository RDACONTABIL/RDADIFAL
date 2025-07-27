import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Download, FileText, Search, Trash2, SlidersHorizontal, AlertCircle, CheckCircle, Clock, MoreHorizontal, QrCode, Landmark } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const actionOptions = [
  "Pagamento de ICMS", "Nota Fiscal", "Frete (Transportador Autônomo)", 
  "Frete CT-e (Convênio 25/1990)", "Ação Fiscal (Transportador)", 
  "Frete (Gerar ICMS)", "Frete Autônomo", 
  "Frete CT-e (Convênio 25/1990) Pagamento de ICMS por Nota Fiscal", 
  "DIFAL", "Dados Complementares"
];

const searchByOptions = [
  { value: "all", label: "Tudo" },
  { value: "nfeKey", label: "Chave de Acesso (NF-e)" },
  { value: "ie", label: "Inscrição Estadual" },
  { value: "cnpj", label: "CNPJ" },
];

const mockStatus = () => {
    const statuses = ['pending', 'paid', 'overdue'];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    paid: { icon: CheckCircle, text: 'Pago', color: 'text-green-400', bg: 'bg-green-500/10' },
    pending: { icon: Clock, text: 'Pendente', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    overdue: { icon: AlertCircle, text: 'Vencido', color: 'text-red-400', bg: 'bg-red-500/10' },
  };
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.text}
    </div>
  );
};


const Calculations = () => {
  const [companies, setCompanies] = useState([]);
  const [calculations, setCalculations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const [selectedAction, setSelectedAction] = useState('DIFAL');
  const [includeDebits, setIncludeDebits] = useState(false);
  const [includeRevenue, setIncludeRevenue] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCalculation, setCurrentCalculation] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedCompanies = localStorage.getItem('difal_companies');
    if (savedCompanies) setCompanies(JSON.parse(savedCompanies));

    const savedCalculations = localStorage.getItem('difal_calculations');
    if (savedCalculations) {
        try {
            const parsedCalculations = JSON.parse(savedCalculations);
            if(Array.isArray(parsedCalculations)) {
                setCalculations(parsedCalculations.map(c => ({...c, status: c.status || mockStatus()})));
            } else {
                setCalculations([]);
            }
        } catch (error) {
            setCalculations([]);
        }
    }
    else setCalculations([]);
  }, []);

  const saveCalculations = (updatedCalculations) => {
    localStorage.setItem('difal_calculations', JSON.stringify(updatedCalculations));
    setCalculations(updatedCalculations);
  };

  const calculateDIFAL = () => {
    if (!selectedCompany || !startDate || !endDate) {
      toast({ title: "Erro", description: "Selecione empresa e período", variant: "destructive" });
      return;
    }
    const company = companies.find(c => c.id.toString() === selectedCompany);
    if (!company) return;

    const mockCalculation = {
      id: Date.now(), companyId: company.id, companyName: company.name, companyCnpj: company.cnpj,
      companyIe: company.ie, companyUf: company.uf, startDate, endDate, originUf: company.uf,
      destinationUf: 'SP', originRate: 18, destinationRate: 18, baseValue: Math.random() * 20000,
      difalValue: Math.random() * 2000, stateShare: 720, municipalityShare: 480,
      nfeKey: `352501${Math.floor(10000000000000000000000000000000000000 + Math.random() * 90000000000000000000000000000000000000)}`,
      createdAt: new Date().toISOString(), action: selectedAction, hasDebits: includeDebits, hasRevenue: includeRevenue, status: mockStatus(),
      dueDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      buyer: { name: "Empresa Compradora LTDA", cnpj: "11.222.333/0001-44" },
      seller: { name: company.name, cnpj: company.cnpj },
    };

    saveCalculations([mockCalculation, ...calculations]);
    toast({ title: "Sucesso", description: "Cálculo simulado realizado!" });
    setSelectedCompany(''); setStartDate(''); setEndDate('');
  };
  
  const deleteCalculation = (id) => {
    const updated = calculations.filter(c => c.id !== id);
    saveCalculations(updated);
    toast({title: "Sucesso", description: "Cálculo removido."});
  }
  
  const handleShowPaymentModal = (calc) => {
    setCurrentCalculation(calc);
    setIsModalOpen(true);
  }

  const handleNotImplemented = () => toast({ title: "🚧 Recurso em desenvolvimento!" });

  const filteredCalculations = calculations.filter(calc => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = term === '' ||
      (searchBy === 'all' && (calc.companyName.toLowerCase().includes(term) || calc.companyCnpj.includes(term) || (calc.companyIe && calc.companyIe.includes(term)) || calc.nfeKey.includes(term))) ||
      (searchBy === 'nfeKey' && calc.nfeKey.includes(term)) ||
      (searchBy === 'ie' && calc.companyIe && calc.companyIe.includes(term)) ||
      (searchBy === 'cnpj' && calc.companyCnpj.includes(term));
    const matchesAction = selectedAction === 'Todos' || calc.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <>
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold gradient-text mb-2">Cálculos e Pagamentos</h1>
        <p className="text-gray-400">Calcule, filtre e gerencie suas guias de recolhimento</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2"><Calculator className="h-5 w-5 text-blue-400" /><span>Novo Cálculo</span></CardTitle>
            <CardDescription>Selecione a empresa, o período e a ação para calcular</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-3"><Label htmlFor="company">Empresa</Label><Select value={selectedCompany} onValueChange={setSelectedCompany}><SelectTrigger><SelectValue placeholder="Selecione uma empresa" /></SelectTrigger><SelectContent>{companies.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name} - {c.cnpj}</SelectItem>)}</SelectContent></Select></div>
              <div><Label htmlFor="startDate">Data Início</Label><Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
              <div><Label htmlFor="endDate">Data Fim</Label><Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
              <div><Label htmlFor="action">Ação</Label><Select value={selectedAction} onValueChange={setSelectedAction}><SelectTrigger><SelectValue placeholder="Selecione uma ação" /></SelectTrigger><SelectContent>{actionOptions.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent></Select></div>
            </div>
             <div className="flex items-center space-x-4 mb-6"><div className="flex items-center space-x-2"><Checkbox id="debits" checked={includeDebits} onCheckedChange={setIncludeDebits} /><Label htmlFor="debits">Incluir Débitos</Label></div><div className="flex items-center space-x-2"><Checkbox id="revenue" checked={includeRevenue} onCheckedChange={setIncludeRevenue} /><Label htmlFor="revenue">Incluir Receita</Label></div></div>
            <div className="flex justify-end"><Button onClick={calculateDIFAL} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"><Calculator className="h-4 w-4 mr-2" />Calcular</Button></div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card className="glass-effect border-white/10">
            <CardHeader><CardTitle className="flex items-center space-x-2"><SlidersHorizontal className="h-5 w-5 text-purple-400"/><span>Filtros e Ações</span></CardTitle></CardHeader>
          <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-[150px]"><Label htmlFor="searchBy">Buscar por</Label><Select value={searchBy} onValueChange={setSearchBy}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{searchByOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select></div>
              <div className="flex-[2] w-full"><Label htmlFor="search">Termo de Busca</Label><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><Input id="search" placeholder="Digite para buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" /></div></div>
            </div>
            {calculations.length > 0 && <Button onClick={handleNotImplemented} variant="outline" className="hover:bg-white/10 mt-6 sm:mt-0"><Download className="h-4 w-4 mr-2" />Baixar Relatório</Button>}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-4">
        {filteredCalculations.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <Card className="glass-effect border-white/10 card-hover">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-3 space-y-2"><h3 className="text-lg font-semibold text-white mb-1">{c.companyName}</h3><p className="text-xs text-gray-400 bg-gray-700/50 rounded px-2 py-1 inline-block">Ação: {c.action}</p><p className="text-sm text-gray-300 truncate">Chave NF-e: {c.nfeKey}</p></div>
                  <div className="space-y-1 text-center"><h4 className="text-xs font-medium text-gray-400">Valor DIFAL</h4><p className="font-semibold text-green-400 text-lg">R$ {c.difalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p></div>
                  <div className="text-center"><h4 className="text-xs font-medium text-gray-400 mb-1">Status</h4><StatusBadge status={c.status}/></div>
                  <div className="flex justify-center items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent className="glass-effect border-white/10">
                        <DropdownMenuItem onClick={() => handleShowPaymentModal(c)}><Landmark className="h-4 w-4 mr-2" />Pagar / Ver Guia</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleNotImplemented}><FileText className="h-4 w-4 mr-2"/>Ver Detalhes da Nota</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleNotImplemented}><Download className="h-4 w-4 mr-2" />Baixar PDF</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteCalculation(c.id)} className="text-red-400 focus:text-red-400"><Trash2 className="h-4 w-4 mr-2" />Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filteredCalculations.length === 0 && <Card className="glass-effect border-white/10"><CardContent className="p-12 text-center"><Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-white mb-2">{calculations.length === 0 ? 'Nenhum cálculo realizado' : 'Nenhum cálculo encontrado'}</h3><p className="text-gray-400">{calculations.length === 0 ? 'Realize seu primeiro cálculo' : 'Ajuste os filtros de busca'}</p></CardContent></Card>}
      </motion.div>
    </div>
    
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-effect border-white/10">
            <DialogHeader>
                <DialogTitle>Pagamento de Guia DIFAL</DialogTitle>
                <CardDescription>
                    Guia para {currentCalculation?.seller.name}
                </CardDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Vendedor:</span>
                        <span className="font-semibold text-white truncate">{currentCalculation?.seller.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Comprador:</span>
                        <span className="font-semibold text-white truncate">{currentCalculation?.buyer.name}</span>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Valor:</span>
                        <span className="font-semibold text-green-400 text-xl">R$ {currentCalculation?.difalValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Vencimento:</span>
                        <Input type="date" value={currentCalculation?.dueDate} onChange={(e) => setCurrentCalculation(c => ({...c, dueDate: e.target.value}))} className="w-auto bg-transparent border-dashed"/>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white text-gray-900 rounded-lg">
                    <QrCode className="h-24 w-24 mb-4" />
                    <p className="font-semibold">Pague com PIX</p>
                    <p className="text-xs text-center break-all text-gray-600 mt-2">00020126...chavepix...5913EMPRESA...6304ABCD</p>
                </div>
                <Button className="w-full" onClick={handleNotImplemented}>Copiar Código PIX</Button>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Fechar</Button>
                <Button onClick={handleNotImplemented}>Autorizar Pagamento</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
};

export default Calculations;